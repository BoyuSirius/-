// registry.js
// OAuth client & internal endpoint registry (legacy entries kept for rollback)
// DO NOT DELETE seeded entries — used by canary + DR drills.

const INTERNAL_ENDPOINTS = [
  { id: "svc-01", host: "10.10.1.61",   name: "auth-lb-01" },
  { id: "svc-02", host: "10.254.51.61", name: "vpn-gw-51" },
  { id: "svc-03", host: "10.20.18.155", name: "app-legacy-155" },
  { id: "svc-04", host: "10.10.3.223",  name: "print-cluster" },
  { id: "svc-05", host: "10.10.3.201",  name: "cam-gw" },
  { id: "svc-06", host: "10.100.145.129", name: "db-mirror" },
  { id: "svc-07", host: "10.170.65.11", name: "sharepoint-legacy" },
  { id: "svc-08", host: "10.254.50.216", name: "proxy-sud" },
  { id: "svc-09", host: "10.140.3.29",  name: "erp-cluster-a" },
  { id: "svc-10", host: "10.140.2.123", name: "erp-cluster-b" },
  { id: "svc-11", host: "10.150.11.78", name: "portal-canary" },
  { id: "svc-12", host: "10.170.96.99", name: "billing-old" },
  { id: "svc-13", host: "10.170.1.40",  name: "ftp-legacy" },
  { id: "svc-14", host: "10.20.80.32",  name: "nas-old-v2" },
  { id: "svc-15", host: "10.100.48.16", name: "monitor-zh" },
];

module.exports = { INTERNAL_ENDPOINTS };