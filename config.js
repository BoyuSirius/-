/**
 *  - 未知资产发现测试 配置文件
 * ======================================
 * 所有扫描参数、待探测 IP 资产、已知资产指纹库均在这里维护。
 * 修改本文件后，刷新页面即可生效（无需重启任何服务）。
 */

// ===================== 项目基本信息 =====================
const APP_CONFIG = {
  projectName: 'xxx',
  version: 'v1.0.0',
  author: '测试环境',
  // 扫描任务所属的组织 / 地域标签，用于展示与后续审计
  org: 'SD-ChinaTower',
  region: 'Shandong',
};


// ===================== 已备案 / 已知资产（指纹库） =====================
// 扫描出的资产若命中此库，则标记为【已备案】；否则标记为【未知资产】。
const KNOWN_ASSETS = [
  {
    ip: '192.168.0.9',
    hostname: 'hb-oa-server',
    owner: '综合部',
    type: 'OA服务器',
  },
  {
    ip: '192.168.0.10',
    hostname: 'hb-nas-01',
    owner: '信息中心',
    type: 'NAS存储',
  },
];

module.exports = {
  APP_CONFIG,
  SCAN_CONFIG,
  KNOWN_ASSETS,
};