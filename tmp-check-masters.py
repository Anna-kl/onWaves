import asyncio
import base64
import json
import os
import urllib.request
import websockets

CHROME_PORT = 9336
OUT = r"d:\Project\Front\front"
URL = "http://127.0.0.1:4200/masters"


async def cdp_call(ws, mid, method, params=None):
    msg = {"id": mid, "method": method}
    if params:
        msg["params"] = params
    await ws.send(json.dumps(msg))
    while True:
        raw = await ws.recv()
        data = json.loads(raw)
        if data.get("id") == mid:
            return data


async def run_viewport(width, height, prefix):
    listing = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{CHROME_PORT}/json/list").read())
    page = next(t for t in listing if t.get("type") == "page")
    async with websockets.connect(page["webSocketDebuggerUrl"], max_size=40_000_000) as ws:
        await cdp_call(ws, 1, "Emulation.setDeviceMetricsOverride", {
            "width": width,
            "height": height,
            "deviceScaleFactor": 1,
            "mobile": width < 800,
        })
        await cdp_call(ws, 2, "Page.enable")
        await cdp_call(ws, 3, "Runtime.enable")
        await cdp_call(ws, 4, "Page.navigate", {"url": URL})
        await asyncio.sleep(3.5)

        info = await cdp_call(ws, 5, "Runtime.evaluate", {
            "expression": """(() => {
              const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
              const btn = document.querySelector('.ml-btn--primary');
              const r = btn ? btn.getBoundingClientRect() : null;
              const links = [...document.querySelectorAll('a')].map(a => a.href);
              return {
                overflowX: overflow,
                scrollWidth: document.documentElement.scrollWidth,
                clientWidth: document.documentElement.clientWidth,
                heroBtnVisible: !!(r && r.top >= 0 && r.top < window.innerHeight - 8),
                heroBtnTop: r && r.top,
                h1: document.querySelector('h1')?.innerText,
                title: document.title,
                hrefs: {
                  telegram: links.filter(h => h.includes('t.me')),
                  max: links.filter(h => h.includes('max.ru')),
                  example: links.filter(h => h.includes('cellings')),
                },
                hasOldCopy: /Осталось 47|4 обращения|Хочу страницу|тексты, которые приносят/i.test(document.body.innerText),
                bodyLen: document.body.innerText.length
              };
            })()""",
            "returnByValue": True,
        })
        metrics = info["result"]["result"]["value"]

        async def shot(name):
            res = await cdp_call(ws, 20 + hash(name) % 1000, "Page.captureScreenshot", {"format": "png"})
            path = os.path.join(OUT, f"{prefix}-{name}.png")
            with open(path, "wb") as f:
                f.write(base64.b64decode(res["result"]["data"]))
            return path

        await shot("hero")

        await cdp_call(ws, 6, "Runtime.evaluate", {
            "expression": "document.querySelector('.ml-btn--primary')?.click()",
        })
        await asyncio.sleep(0.9)
        after = await cdp_call(ws, 7, "Runtime.evaluate", {
            "expression": """(() => {
              const c = document.querySelector('#contact');
              const r = c.getBoundingClientRect();
              return { top: Math.round(r.top), inView: r.top < window.innerHeight && r.bottom > 0, y: Math.round(window.scrollY) };
            })()""",
            "returnByValue": True,
        })
        after_click = after["result"]["result"]["value"]
        await shot("cta")

        for sel, name in [
            (".ml-help", "help"),
            (".ml-terms", "terms"),
            (".ml-ai", "ai"),
            (".ml-proof", "proof"),
            (".ml-cal", "cal"),
            (".ml-founder", "founder"),
            (".ml-extra", "extra"),
        ]:
            await cdp_call(ws, 8, "Runtime.evaluate", {
                "expression": f"document.querySelector('{sel}')?.scrollIntoView({{block:'start'}})",
            })
            await asyncio.sleep(0.35)
            await shot(name)

        return {"metrics": metrics, "after_click": after_click}


async def main():
    mobile = await run_viewport(390, 844, "tmp-m")
    desktop = await run_viewport(1280, 900, "tmp-d")
    out = {"mobile": mobile, "desktop": desktop}
    with open(os.path.join(OUT, "tmp-masters-check.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
