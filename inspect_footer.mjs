import { spawn } from 'child_process';
import http from 'http';

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json/version', res => {
          let buf = '';
          res.on('data', chunk => buf += chunk);
          res.on('end', () => resolve(JSON.parse(buf)));
        }).on('error', reject);
      });
      return data.webSocketDebuggerUrl;
    } catch (e) {
      await wait(300);
    }
  }
  throw new Error('Could not connect to Chrome debugging port');
}

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--user-data-dir=C:\\Users\\Shifat\\.gemini\\antigravity-ide\\brain\\570747a0-5bb5-4ccb-89ac-6156f53f7d20\\chrome-tmp',
  '--disable-gpu',
  '--no-first-run',
  'about:blank'
]);

try {
  const wsUrl = await getWsUrl();
  console.log('Connected to ws:', wsUrl);
  const ws = new WebSocket(wsUrl);

  let idCounter = 1;
  const pending = new Map();
  const consoleLogs = [];
  const errors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result, msg.error);
      pending.delete(msg.id);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      errors.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, (res, err) => err ? reject(err) : resolve(res));
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Create new target for page
  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, (res, err) => err ? reject(err) : resolve(res));
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');
  await sendSession('DOM.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await wait(1500);

  // Evaluate script to scroll through footer
  const evalResult = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const footer = document.getElementById('footer');
        const canvas = document.getElementById('footer-kinetic-grid');
        const banner = document.querySelector('.footer__banner');
        const stats = document.querySelector('.footer__stats');
        const gridCols = document.querySelectorAll('.footer__col');
        const bottom = document.querySelector('.footer__bottom');

        const getInfo = (el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            tagName: el.tagName,
            className: el.className,
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            position: cs.position,
            display: cs.display,
            zIndex: cs.zIndex,
            opacity: cs.opacity,
            transform: cs.transform,
            pointerEvents: cs.pointerEvents
          };
        };

        // Scroll all the way to bottom of the page
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });

        return {
          windowHeight: window.innerHeight,
          scrollY: window.scrollY,
          footer: getInfo(footer),
          canvas: {
            ...getInfo(canvas),
            canvasWidth: canvas ? canvas.width : null,
            canvasHeight: canvas ? canvas.height : null
          },
          banner: getInfo(banner),
          stats: getInfo(stats),
          bottom: getInfo(bottom),
          gridCols: Array.from(gridCols).map(getInfo)
        };
      })()
    `,
    returnByValue: true
  });

  console.log('--- EVAL RESULT AT BOTTOM ---');
  console.log(JSON.stringify(evalResult.result.value, null, 2));

  await wait(2500);

  const evalAfter = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const banner = document.querySelector('.footer__banner');
        const stats = document.querySelector('.footer__stats');
        const gridCols = document.querySelectorAll('.footer__col');
        const bottom = document.querySelector('.footer__bottom');
        const canvas = document.getElementById('footer-kinetic-grid');

        const getStatus = el => {
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          return {
            classes: el.className,
            opacity: cs.opacity,
            transform: cs.transform
          };
        };

        return {
          banner: getStatus(banner),
          stats: getStatus(stats),
          bottom: getStatus(bottom),
          gridCols: Array.from(gridCols).map(getStatus),
          canvas: {
            width: canvas.width,
            height: canvas.height,
            styleWidth: canvas.style.width,
            styleHeight: canvas.style.height
          }
        };
      })()


    `,
    returnByValue: true
  });

  console.log('--- EVAL RESULT AFTER SCROLL & WAIT ---');
  console.log(JSON.stringify(evalAfter.result.value, null, 2));

  // Capture screenshot of footer
  const shot = await sendSession('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1200,
      height: 1400,
      scale: 1
    }
  });

  const fs = await import('fs');
  fs.writeFileSync('D:\\laragon\\www\\transformer-demo\\footer_view.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved footer_view.png');
  console.log('Console logs:', consoleLogs);
  console.log('Errors:', errors);

  ws.close();
} finally {
  chrome.kill();
}
