import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import http from 'node:http';

const CHROME = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
const PORT = 9335;
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${process.env.TEMP}\\\\ow-chrome-masters`,
], { stdio: 'ignore' });

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function waitForDebugger() {
  for (let i = 0; i < 40; i++) {
    try {
      return await getJson(`http://127.0.0.1:${PORT}/json/version`);
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  throw new Error('CDP not ready');
}

async function wsSend(wsUrl, method, params = {}, id = 1) {
  const WebSocket = (await import('node:module')).createRequire(import.meta.url)('ws');
  // Use raw HTTP CDP via /json/protocol is heavy; use fetch to browser websocket with chrome-remote.
}

function cdpHttp(wsDebuggerUrl) {
  // fallback: use fetch to /json and then a simple websocket via chrome's HTTP PUT is not available.
}

async function session(method, params = {}) {
  const list = await getJson(`http://127.0.0.1:${PORT}/json/list`);
  const page = list.find((t) => t.type === 'page') || list[0];
  const wsUrl = page.webSocketDebuggerUrl;
  const { default: WebSocket } = await import('ws').catch(() => ({ default: null }));
  if (!WebSocket) {
    // Minimal WS client
    const net = await import('node:net');
    const url = new URL(wsUrl);
    throw new Error('no ws');
  }
}

// Minimal WebSocket client without the ws package
function connectWs(wsUrl) {
  return new Promise((resolve, reject) => {
    const u = new URL(wsUrl);
    const key = Buffer.from(String(Math.random())).toString('base64').slice(0, 24);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
        'Sec-WebSocket-Version': '13',
        'Sec-WebSocket-Key': key,
      },
    });
    req.on('upgrade', (res, socket) => resolve(makeCdp(socket)));
    req.on('error', reject);
    req.end();
  });
}

function makeCdp(socket) {
  let id = 0;
  const pending = new Map();
  let buf = Buffer.alloc(0);

  socket.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    while (buf.length >= 2) {
      const fin = buf[0] & 0x80;
      const opcode = buf[0] & 0x0f;
      let payloadLen = buf[1] & 0x7f;
      const masked = buf[1] & 0x80;
      let offset = 2;
      if (payloadLen === 126) {
        if (buf.length < 4) return;
        payloadLen = buf.readUInt16BE(2);
        offset = 4;
      } else if (payloadLen === 127) {
        return; // ignore huge
      }
      if (buf.length < offset + payloadLen) return;
      let payload = buf.subarray(offset, offset + payloadLen);
      buf = buf.subarray(offset + payloadLen);
      if (opcode === 1) {
        const msg = JSON.parse(payload.toString('utf8'));
        if (msg.id && pending.has(msg.id)) {
          pending.get(msg.id)(msg);
          pending.delete(msg.id);
        }
      }
      if (!fin) break;
    }
  });

  function sendFrame(data) {
    const payload = Buffer.from(data);
    const header = Buffer.alloc(2);
    header[0] = 0x81;
    header[1] = payload.length;
    if (payload.length >= 126) {
      throw new Error('frame too large');
    }
    socket.write(Buffer.concat([header, payload]));
  }

  return {
    send(method, params = {}) {
      const msgId = ++id;
      return new Promise((resolve) => {
        pending.set(msgId, resolve);
        sendFrame(JSON.stringify({ id: msgId, method, params }));
      });
    },
    close() { socket.end(); },
  };
}

const version = await waitForDebugger();
const tabs = await getJson(`http://127.0.0.1:${PORT}/json/list`);
let page = tabs.find((t) => t.type === 'page');
if (!page) {
  await getJson(`http://127.0.0.1:${PORT}/json/new?http://127.0.0.1:4200/masters`).catch(() => {});
}

async function runViewport(width, height, prefix) {
  const tabsNow = await getJson(`http://127.0.0.1:${PORT}/json/list`);
  const target = tabsNow.find((t) => t.type === 'page') || tabsNow[0];
  const cdp = await connectWs(target.webSocketDebuggerUrl);
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 1, mobile: width < 800,
  });
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.navigate', { url: 'http://127.0.0.1:4200/masters' });
  await new Promise((r) => setTimeout(r, 4000));

  const metrics = await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      const btn = document.querySelector('.ml-btn--primary');
      const contact = document.querySelector('#contact');
      const links = [...document.querySelectorAll('.ml-cta a.ml-btn')].map(a => ({text: a.innerText.trim(), href: a.href}));
      const phone = document.querySelector('.ml-phone');
      const heroBtnTop = btn ? btn.getBoundingClientRect().top : null;
      const h1 = document.querySelector('h1')?.innerText;
      const title = document.title;
      return {
        overflowX: overflow,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        heroBtnTop,
        heroBtnVisible: heroBtnTop !== null && heroBtnTop < window.innerHeight,
        h1,
        title,
        links,
        phoneHref: phone?.href || null,
        contactExists: !!contact,
        innerHeight: window.innerHeight,
      };
    })()`,
    returnByValue: true,
  });

  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`d:/Project/Front/front/${prefix}-hero.png`, Buffer.from(shot.result.data, 'base64'));

  // Click CTA
  await cdp.send('Runtime.evaluate', {
    expression: `document.querySelector('.ml-btn--primary')?.click()`,
  });
  await new Promise((r) => setTimeout(r, 800));
  const afterClick = await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const contact = document.querySelector('#contact');
      const r = contact.getBoundingClientRect();
      return { top: r.top, inView: r.top < window.innerHeight && r.bottom > 0, scrollY: window.scrollY };
    })()`,
    returnByValue: true,
  });
  const ctaShot = await cdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`d:/Project/Front/front/${prefix}-cta.png`, Buffer.from(ctaShot.result.data, 'base64'));

  // Scroll through sections
  const sections = ['.ml-help', '.ml-terms', '.ml-ai', '.ml-proof', '.ml-cal', '.ml-founder', '.ml-extra'];
  const shots = {};
  for (const sel of sections) {
    await cdp.send('Runtime.evaluate', {
      expression: `document.querySelector('${sel}')?.scrollIntoView({block:'start'})`,
    });
    await new Promise((r) => setTimeout(r, 250));
    const s = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const name = sel.replace('.', '');
    writeFileSync(`d:/Project/Front/front/${prefix}-${name}.png`, Buffer.from(s.result.data, 'base64'));
    shots[name] = true;
  }

  cdp.close();
  return { metrics: metrics.result.result.value, afterClick: afterClick.result.result.value, shots };
}

const mobile = await runViewport(390, 844, 'tmp-m');
const desktop = await runViewport(1280, 900, 'tmp-d');
writeFileSync('d:/Project/Front/front/tmp-masters-check.json', JSON.stringify({ mobile, desktop }, null, 2));
chrome.kill();
console.log(JSON.stringify({ mobile: mobile.metrics, afterM: mobile.afterClick, desktop: desktop.metrics, afterD: desktop.afterClick }, null, 2));
process.exit(0);
