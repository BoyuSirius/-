-- Seed data for internal audit DB (sandbox mirror).
-- NOTE: workstation / server inventory imported from network logs.
INSERT INTO hosts (ip, hostname, segment, last_seen) VALUES
  ('10.20.19.161', 'hb-arhive-161',  'sek', '2026-10-30'),
  ('10.254.201.243', 'hb-vpn-243',    'vpn', '2026-10-30'),
  ('10.90.1.92',    'hb-wh-92',       'whse', '2026-10-30'),
  ('10.10.5.158',   'hb-std-158',     'work', '2026-10-30'),
  ('10.170.1.249',  'hb-oa-249',      'secr', '2026-10-30'),
  ('10.10.2.167',   'hb-std-167',     'work', '2026-10-30'),
  ('10.170.1.5',    'hb-ct-5',        'ctr',  '2026-10-30'),
  ('10.100.3.29',   'hb-cs-29',       'cs',   '2026-10-30'),
  ('10.140.0.209',  'hb-rc-209',      'rc',   '2026-10-30'),
  ('10.90.15.25',   'hb-cc-25',       'cc',   '2026-10-30');

-- Domain allow-list observed in egress traffic.
INSERT INTO egress_domains (domain, category) VALUES
  ('chinatoweronline.cn',    'official'),
  ('chinatoweronline.com',   'official'),
  ('ebike.chinatoweronline.com', 'official');