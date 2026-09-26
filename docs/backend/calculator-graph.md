# Калькулятор — контракт для фронта

Схема и движок графа: `OcpioServer/docs/CALCULATOR-GRAPH.md`.
Уточнение 13.09.2026: [граф v2](../../../../OcpioServer/docs/CALCULATOR-GRAPH-V2-2026-09-13.md).

HTTP есть: `GET/POST/PUT v1/api/calculators*`. Angular не считает сумму — только показывает шаг и шлёт ответ.
Токен прохода — заголовок `X-Quote-Token`, не URL. Quote стартует в браузере, публичный GET `by-profile` можно на SSR.

Плоский `LandingOffer.Calculator` остаётся для старых акций. Новая акция с графом пишет `ProfileCalculatorId` у кнопки Calculator и не дублирует встроенную формулу.

Пилот — профили вроде `/cellings`. CTA «рассчитать / замер», не подмена «Записаться онлайн» у салонов.
