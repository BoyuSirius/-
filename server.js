/**
 * 山东铁塔未知资产发现测试 - 本地 Mock 后端
 * ==========================================
 * 作用：模拟【资产发现引擎】的 HTTP 接口，不用对接真实内网扫描器，
 *       便于前端 + 后端联调的演示与测试。
 *
 * 启动方式：
 *   npm install    （若无依赖则跳过）
 *   node server.js
 * 然后浏览器访问： http://localhost:3000
 *
 * 也可使用内置 Node 模块，无需安装任何依赖：
 *   浏览器双击 index.html 打开（纯前端模式，不使用本服务）
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { APP_CONFIG, SCAN_CONFIG, KNOWN_ASSETS } = require('./config');

const PORT = 3000;
const HOST = '0.0.0.0';

// ---------- Mock 探测数据 ----------
const MOCK_POOL = [
  { ip: '1.1.1.1',      alive: true,  ports: [80, 443, 8080], type: '未知设备（疑似出口网关）' },
  { ip: '192.168.0.9',  alive: true,  ports: [80, 3389, 443], type: 'OA服务器' },
  { ip: '192.168.0.10', alive: true,  ports: [445, 139],      type: 'NAS存储' },
  { ip: '192.168.0.11', alive: false, ports: [],              type: '无' },
  { ip: '192.168.0.12', alive: true,  ports: [23, 8080],      type: '未知设备（疑似网络设备）' },
  { ip: '192.168.0.15', alive: true,  ports: [8080, 7001],    type: '未知中间件（疑似 WebLogic）' },
];

function parseTargets(raw) {
  return String(raw || '')
    .split(/[\s,]/)
    .filter(Boolean);
}

// ---------- HTTP 服务 ----------
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = req.url.split('?')[0];
  const query = new URLSearchParams(req.url.includes('?') ? req.url.split('?')[1] : '');

  const json = (code, data) => {
    res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  };

  // 静态文件：首页 / 前端资源
  if (req.method === 'GET' && (url === '/' || url === '/index.html')) {
    return serveStatic(res, path.join(__dirname, 'index.html'), 'text/html; charset=utf-8');
  }

  // GET /api/config          - 获取配置
  if (req.method === 'GET' && url === '/api/config') {
    return json(200, { app: APP_CONFIG, scan: SCAN_CONFIG, knownAssets: KNOWN_ASSETS });
  }

  // GET /api/health          - 服务健康检查
  if (req.method === 'GET' && url === '/api/health') {
    return json(200, { status: 'ok', time: new Date().toISOString() });
  }

  // POST /api/scan/discover  - 资产发现（核心接口）
  if (req.method === 'POST' && url === '/api/scan/discover') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let params = {};
      try { params = JSON.parse(body || '{}'); } catch (e) { /* ignore */ }

      const targets = parseTargets(params.targets || SCAN_CONFIG.targets.join(' '));
      const results = MOCK_POOL.filter((m) => targets.includes(m.ip));

      // 与已知资产库比对，打标记 unknownFlag
      const enriched = results.map((r) => {
        const known = KNOWN_ASSETS.find((k) => k.ip === r.ip);
        return {
          ...r,
          unknownFlag: known ? false : true,   // true = 未知资产
          knownInfo: known || null,
        };
      });

      const alive = enriched.filter((r) => r.alive).length;
      const unknown = enriched.filter((r) => r.unknownFlag).length;

      console.log(`[扫描] 目标: ${targets.join(', ')} | 资产: ${enriched.length} | 未知: ${unknown}`);

      return json(200, {
        code: 0,
        msg: 'success',
        taskId: 'TASK-' + Date.now(),
        total: enriched.length,
        alive,
        unknown,
        unknownFlagList: enriched.filter((r) => r.unknownFlag),
        results: enriched,
      });
    });
    return;
  }

  // 其他 404
  return json(404, { code: 404, msg: 'Not Found' });
});

// ---------- 静态文件服务 ----------
function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not Found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// ---------- 启动 ----------
server.listen(PORT, HOST, () => {
  console.log('==============================================');
  console.log('  ' + APP_CONFIG.projectName + '  ' + APP_CONFIG.version);
  console.log('----------------------------------------------');
  console.log('  本地服务:  http://127.0.0.1:' + PORT);
  console.log('  内网访问:  http://192.168.0.9:' + PORT + '  (示例)');
  console.log('  配置项:    config.js  (目标网段 / 端口 / 已知资产)');
  console.log('==============================================');
});