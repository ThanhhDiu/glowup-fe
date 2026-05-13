-- =====================================================================
-- GlowUp Concierge — demo seed data
-- =====================================================================
-- Idempotent: an toàn để chạy nhiều lần. ON CONFLICT (code) DO NOTHING.
--
-- Yêu cầu trong application.yml:
--   spring.jpa.defer-datasource-initialization: true
--   spring.sql.init.mode: always
--
-- Tất cả user trong file này dùng password DEMO: "password"
-- BCrypt hash dưới đây = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- (đây là hash chính thức trong Spring Security docs encode "password")
--
-- Login mẫu sau khi seed:
--   admin@glowup.vn  / password   (role: admin)
--   lan@email.com    / password   (role: customer)
--   hoang@email.com  / password   (role: customer)
--   tuan@glowup.pro  / password   (role: technician)
--   minh@glowup.pro  / password   (role: technician)
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. USERS — 1 admin + 2 customers + 2 technicians
-- ---------------------------------------------------------------------

INSERT INTO users (code, full_name, email, phone, password, role, status, district, address, bio, avatar, deleted, created_at, updated_at)
VALUES
('USR-001', 'Quản trị viên', 'admin@glowup.vn', '0900000000',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'ADMIN', 'ACTIVE', 'Quận 1', '123 Lê Lợi, Quận 1', NULL,
 'https://i.pravatar.cc/150?img=68', FALSE, NOW(), NOW()),

('USR-002', 'Trần Thị Lan', 'lan@email.com', '0901234567',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER', 'ACTIVE', 'Quận 7', '123 Nguyễn Văn Linh, Quận 7', NULL,
 'https://i.pravatar.cc/150?img=5', FALSE, NOW(), NOW()),

('USR-003', 'Phạm Hoàng', 'hoang@email.com', '0901234568',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'CUSTOMER', 'ACTIVE', 'Quận 3', '45 Võ Văn Tần, Quận 3', NULL,
 'https://i.pravatar.cc/150?img=12', FALSE, NOW(), NOW()),

('USR-004', 'Trần Anh Tuấn', 'tuan@glowup.pro', '0987654321',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'TECHNICIAN', 'ACTIVE', 'Quận 1', '25 Bis Nguyễn Thị Minh Khai, Quận 1',
 'Hơn 10 năm kinh nghiệm sửa điện lạnh, bảo trì máy lạnh, hệ thống thông gió.',
 'https://i.pravatar.cc/150?img=33', FALSE, NOW(), NOW()),

('USR-005', 'Nguyễn Văn Minh', 'minh@glowup.pro', '0987654322',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'TECHNICIAN', 'ACTIVE', 'Quận Bình Thạnh', '78 Đinh Bộ Lĩnh, Bình Thạnh',
 'Chuyên sửa máy giặt cửa ngang, tủ lạnh inverter các hãng.',
 'https://i.pravatar.cc/150?img=13', FALSE, NOW(), NOW())

ON CONFLICT (code) DO NOTHING;


-- ---------------------------------------------------------------------
-- 2. CATEGORIES — 5 dịch vụ chính
-- ---------------------------------------------------------------------

INSERT INTO categories (code, title, description, icon_url, priority, status, deleted, created_at, updated_at)
VALUES
('CAT-001', 'Máy lạnh',     'Vệ sinh, bơm gas, sửa chữa board mạch máy lạnh inverter.',
  NULL, 'HIGH',   'ACTIVE', FALSE, NOW(), NOW()),
('CAT-002', 'Máy giặt',     'Sửa chữa máy giặt cửa ngang, cửa trên, vắt không sạch, không xả nước.',
  NULL, 'HIGH',   'ACTIVE', FALSE, NOW(), NOW()),
('CAT-003', 'Tủ lạnh',      'Sửa tủ lạnh không lạnh, chảy nước, kêu to, board điện tử.',
  NULL, 'NORMAL', 'ACTIVE', FALSE, NOW(), NOW()),
('CAT-004', 'Máy nước nóng','Lắp đặt, sửa chữa, bảo trì máy nước nóng năng lượng mặt trời + điện.',
  NULL, 'NORMAL', 'ACTIVE', FALSE, NOW(), NOW()),
('CAT-005', 'Khác',         'Các thiết bị gia dụng khác: lò vi sóng, máy lọc nước, quạt công nghiệp.',
  NULL, 'LOW',    'ACTIVE', FALSE, NOW(), NOW())

ON CONFLICT (code) DO NOTHING;


-- ---------------------------------------------------------------------
-- 3. TECHNICIAN PROFILES — cho 2 thợ
-- ---------------------------------------------------------------------

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                  type, title_badge, years_experience, verification_status,
                                  last_active_at, joined_at, updated_at)
SELECT u.id,
       'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
       'Điện lạnh', 250000, TRUE,
       'PREMIUM', 'CHUYÊN GIA KIM CƯƠNG', 10, 'APPROVED',
       NOW(), NOW() - INTERVAL '2 years', NOW()
FROM users u WHERE u.code = 'USR-004'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                  type, title_badge, years_experience, verification_status,
                                  last_active_at, joined_at, updated_at)
SELECT u.id,
       'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
       'Máy giặt', 180000, TRUE,
       'NORMAL', NULL, 5, 'APPROVED',
       NOW(), NOW() - INTERVAL '1 year', NOW()
FROM users u WHERE u.code = 'USR-005'
ON CONFLICT (user_id) DO NOTHING;


-- ---------------------------------------------------------------------
-- 4. TECHNICIAN SKILLS — collection table
-- ---------------------------------------------------------------------

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
JOIN users u ON tp.user_id = u.id
CROSS JOIN LATERAL (
    VALUES ('Sửa điện lạnh'), ('Bảo trì máy lạnh'), ('Hệ thống thông gió')
) AS s(skill)
WHERE u.code = 'USR-004'
  AND NOT EXISTS (
      SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
  );

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
JOIN users u ON tp.user_id = u.id
CROSS JOIN LATERAL (
    VALUES ('Sửa máy giặt cửa ngang'), ('Sửa tủ lạnh inverter'), ('Thay board điện tử')
) AS s(skill)
WHERE u.code = 'USR-005'
  AND NOT EXISTS (
      SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
  );


-- ---------------------------------------------------------------------
-- 5. TECHNICIAN SERVICE AREAS
-- ---------------------------------------------------------------------

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
JOIN users u ON tp.user_id = u.id
CROSS JOIN LATERAL (VALUES ('Quận 1'), ('Quận 3'), ('Quận 7')) AS a(area)
WHERE u.code = 'USR-004'
  AND NOT EXISTS (
      SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
  );

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
JOIN users u ON tp.user_id = u.id
CROSS JOIN LATERAL (VALUES ('Quận Bình Thạnh'), ('Quận Phú Nhuận'), ('Quận Gò Vấp')) AS a(area)
WHERE u.code = 'USR-005'
  AND NOT EXISTS (
      SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
  );


-- ---------------------------------------------------------------------
-- 6. SAMPLE COMPLETED ORDER + REVIEW — phục vụ test detail/review
--    Customer: lan (USR-002), Technician: tuan (USR-004)
-- ---------------------------------------------------------------------

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, started_at, completed_at,
                    estimated_price, final_price, payment_method, warranty_months,
                    status, customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99210',
       'Sửa máy lạnh', 'Vệ sinh + nạp gas R32', 'Máy lạnh',
       'Máy lạnh Daikin Inverter 1.5HP',
       'Máy lạnh bị rỉ nước, không mát đều, cần vệ sinh và nạp gas.',
       '25 Bis Nguyễn Thị Minh Khai, Quận 1',
       NOW() - INTERVAL '3 days',
       NOW() - INTERVAL '3 days' + INTERVAL '5 minutes',
       NOW() - INTERVAL '3 days' + INTERVAL '2 hours',
       450000, 450000, 'MOMO', 3,
       'COMPLETED',
       (SELECT id FROM users WHERE code = 'USR-002'),
       (SELECT id FROM users WHERE code = 'USR-004'),
       FALSE, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99210');

-- Image trên đơn (record loại "request")
INSERT INTO order_images (order_id, url, role, created_at)
SELECT o.id, 'https://images.unsplash.com/photo-1581093458791-9d42f6e8a3d3', 'request', NOW()
FROM orders o
WHERE o.code = 'GU-99210'
  AND NOT EXISTS (SELECT 1 FROM order_images oi WHERE oi.order_id = o.id);

-- Review sau khi hoàn thành
INSERT INTO reviews (code, order_id, author_id, technician_id, rating, content, created_at)
SELECT 'REV-001',
       o.id,
       (SELECT id FROM users WHERE code = 'USR-002'),
       (SELECT id FROM users WHERE code = 'USR-004'),
       5,
       'Anh Tuấn làm việc rất kỹ, giải thích rõ ràng nguyên nhân máy lạnh bị rỉ nước. Sẽ ủng hộ lần sau!',
       NOW() - INTERVAL '2 days'
FROM orders o
WHERE o.code = 'GU-99210'
  AND NOT EXISTS (SELECT 1 FROM reviews WHERE code = 'REV-001');


-- ---------------------------------------------------------------------
-- 7. SAMPLE NEW ORDER — đang chờ thợ nhận (test flow accept)
--    Customer: hoang (USR-003)
-- ---------------------------------------------------------------------

INSERT INTO orders (code, service_name, service_category, device_name, description,
                    address, expected_time, estimated_price,
                    status, customer_id, deleted, created_at, updated_at)
SELECT 'GU-99300',
       NULL, 'Máy giặt',
       'Máy giặt cửa ngang LG 9kg',
       'Máy giặt nhà tôi dạo này chạy không vắt được, có tiếng kêu lạ.',
       '45 Võ Văn Tần, Quận 3',
       NOW() + INTERVAL '1 day',
       450000,
       'NEW',
       (SELECT id FROM users WHERE code = 'USR-003'),
       FALSE, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99300');


-- ---------------------------------------------------------------------
-- 8. ADMIN SYSTEM SETTINGS — default commission & VAT
-- ---------------------------------------------------------------------
-- system_settings được Hibernate auto-create từ entity SystemSetting.
-- Skip — service layer tự tạo default khi gọi GET /admin/settings lần đầu.


-- =====================================================================
-- DONE. Verify với:
--   SELECT code, role, status FROM users ORDER BY code;
--   SELECT code, title FROM categories ORDER BY code;
--   SELECT code, status FROM orders ORDER BY code;
-- =====================================================================
-- =====================================================================
-- EXTRA DEMO DATA — nhiều data hơn để test list/filter/pagination
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. EXTRA USERS: thêm 6 customers + 5 technicians
-- ---------------------------------------------------------------------

INSERT INTO users (code, full_name, email, phone, password, role, status, district, address, bio, avatar, deleted, created_at, updated_at)
VALUES
    ('USR-006', 'Lê Minh Anh', 'minhanh@email.com', '0910000006',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'Quận 10', '88 Sư Vạn Hạnh, Quận 10', NULL,
     'https://i.pravatar.cc/150?img=21', FALSE, NOW(), NOW()),

    ('USR-007', 'Ngô Bảo Châu', 'baochau@email.com', '0910000007',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'Quận Tân Bình', '19 Cộng Hòa, Tân Bình', NULL,
     'https://i.pravatar.cc/150?img=22', FALSE, NOW(), NOW()),

    ('USR-008', 'Vũ Hải Nam', 'hainam@email.com', '0910000008',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'Quận Gò Vấp', '41 Phan Văn Trị, Gò Vấp', NULL,
     'https://i.pravatar.cc/150?img=23', FALSE, NOW(), NOW()),

    ('USR-009', 'Đặng Thu Hà', 'thuha@email.com', '0910000009',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'TP Thủ Đức', '12 Võ Văn Ngân, Thủ Đức', NULL,
     'https://i.pravatar.cc/150?img=24', FALSE, NOW(), NOW()),

    ('USR-010', 'Bùi Quang Huy', 'quanghuy@email.com', '0910000010',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'Quận Bình Tân', '77 Tên Lửa, Bình Tân', NULL,
     'https://i.pravatar.cc/150?img=25', FALSE, NOW(), NOW()),

    ('USR-011', 'Hoàng Yến Nhi', 'yennhi@email.com', '0910000011',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'CUSTOMER', 'ACTIVE', 'Quận 5', '36 Trần Hưng Đạo, Quận 5', NULL,
     'https://i.pravatar.cc/150?img=26', FALSE, NOW(), NOW()),

    ('USR-012', 'Lê Công Thành', 'thanh@glowup.pro', '0987000012',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'TECHNICIAN', 'ACTIVE', 'Quận 10', '10 Lý Thường Kiệt, Quận 10',
     'Chuyên sửa điện dân dụng, lắp đặt ổ cắm, đèn và CB.',
     'https://i.pravatar.cc/150?img=40', FALSE, NOW(), NOW()),

    ('USR-013', 'Phạm Đức Long', 'long@glowup.pro', '0987000013',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'TECHNICIAN', 'ACTIVE', 'Quận Tân Phú', '55 Lũy Bán Bích, Tân Phú',
     'Kỹ thuật viên sửa máy nước nóng, máy lọc nước, thiết bị nhà bếp.',
     'https://i.pravatar.cc/150?img=41', FALSE, NOW(), NOW()),

    ('USR-014', 'Nguyễn Hoàng Phúc', 'phuc@glowup.pro', '0987000014',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'TECHNICIAN', 'ACTIVE', 'TP Thủ Đức', '90 Kha Vạn Cân, Thủ Đức',
     'Chuyên bảo trì tủ lạnh, thay block, xử lý rò rỉ gas.',
     'https://i.pravatar.cc/150?img=42', FALSE, NOW(), NOW()),

    ('USR-015', 'Trương Quốc Việt', 'viet@glowup.pro', '0987000015',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'TECHNICIAN', 'ACTIVE', 'Quận 8', '28 Phạm Thế Hiển, Quận 8',
     'Chuyên sửa máy giặt, máy sấy, vệ sinh lồng giặt.',
     'https://i.pravatar.cc/150?img=43', FALSE, NOW(), NOW()),

    ('USR-016', 'Mai Tấn Lộc', 'loc@glowup.pro', '0987000016',
     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
     'TECHNICIAN', 'INACTIVE', 'Quận 6', '14 Hậu Giang, Quận 6',
     'Tạm ngưng nhận đơn trong tuần này.',
     'https://i.pravatar.cc/150?img=44', FALSE, NOW(), NOW())
    ON CONFLICT (code) DO NOTHING;

-- ---------------------------------------------------------------------
-- 2. EXTRA CATEGORIES
-- ---------------------------------------------------------------------

INSERT INTO categories (code, title, description, icon_url, priority, status, deleted, created_at, updated_at)
VALUES
    ('CAT-006', 'Điện dân dụng', 'Sửa chập điện, CB, ổ cắm, đèn, quạt trần.', NULL, 'HIGH', 'ACTIVE', FALSE, NOW(), NOW()),
    ('CAT-007', 'Máy lọc nước', 'Thay lõi, sửa rò nước, vệ sinh máy lọc nước.', NULL, 'NORMAL', 'ACTIVE', FALSE, NOW(), NOW()),
    ('CAT-008', 'Bếp từ', 'Sửa bếp từ không nóng, báo lỗi, chập mạch.', NULL, 'NORMAL', 'ACTIVE', FALSE, NOW(), NOW()),
    ('CAT-009', 'Máy sấy', 'Sửa máy sấy không nóng, không quay, kêu lớn.', NULL, 'LOW', 'ACTIVE', FALSE, NOW(), NOW()),
    ('CAT-010', 'Quạt điện', 'Sửa quạt đứng, quạt treo tường, quạt trần.', NULL, 'LOW', 'ACTIVE', FALSE, NOW(), NOW())
    ON CONFLICT (code) DO NOTHING;

-- ---------------------------------------------------------------------
-- 3. EXTRA TECHNICIAN PROFILES
-- ---------------------------------------------------------------------

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                 type, title_badge, years_experience, verification_status,
                                 last_active_at, joined_at, updated_at)
SELECT u.id, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
       'Điện dân dụng', 200000, TRUE, 'NORMAL', NULL, 6, 'APPROVED',
       NOW(), NOW() - INTERVAL '18 months', NOW()
FROM users u WHERE u.code = 'USR-012'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                 type, title_badge, years_experience, verification_status,
                                 last_active_at, joined_at, updated_at)
SELECT u.id, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
       'Máy nước nóng', 220000, TRUE, 'NORMAL', NULL, 4, 'APPROVED',
       NOW(), NOW() - INTERVAL '10 months', NOW()
FROM users u WHERE u.code = 'USR-013'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                 type, title_badge, years_experience, verification_status,
                                 last_active_at, joined_at, updated_at)
SELECT u.id, 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
       'Tủ lạnh', 280000, TRUE, 'PREMIUM', 'THỢ GIỎI KHU VỰC', 9, 'APPROVED',
       NOW(), NOW() - INTERVAL '3 years', NOW()
FROM users u WHERE u.code = 'USR-014'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                 type, title_badge, years_experience, verification_status,
                                 last_active_at, joined_at, updated_at)
SELECT u.id, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
       'Máy giặt', 190000, TRUE, 'NORMAL', NULL, 5, 'APPROVED',
       NOW(), NOW() - INTERVAL '14 months', NOW()
FROM users u WHERE u.code = 'USR-015'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO technician_profiles (user_id, cover_image, service_category, price_per_hour, is_available,
                                 type, title_badge, years_experience, verification_status,
                                 last_active_at, joined_at, updated_at)
SELECT u.id, 'https://images.unsplash.com/photo-1521207418485-99c705420785',
       'Quạt điện', 150000, FALSE, 'NORMAL', NULL, 3, 'PENDING',
       NOW() - INTERVAL '3 days', NOW() - INTERVAL '6 months', NOW()
FROM users u WHERE u.code = 'USR-016'
ON CONFLICT (user_id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 4. EXTRA SKILLS
-- ---------------------------------------------------------------------

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (
    VALUES ('Sửa chập điện'), ('Lắp CB'), ('Thay ổ cắm'), ('Đi dây điện')
        ) AS s(skill)
WHERE u.code = 'USR-012'
  AND NOT EXISTS (
    SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
);

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (
    VALUES ('Sửa máy nước nóng'), ('Thay lõi lọc nước'), ('Xử lý rò nước')
        ) AS s(skill)
WHERE u.code = 'USR-013'
  AND NOT EXISTS (
    SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
);

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (
    VALUES ('Sửa tủ lạnh'), ('Thay block'), ('Nạp gas tủ lạnh'), ('Sửa board inverter')
        ) AS s(skill)
WHERE u.code = 'USR-014'
  AND NOT EXISTS (
    SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
);

INSERT INTO technician_skills (profile_id, skill)
SELECT tp.id, s.skill
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (
    VALUES ('Sửa máy giặt'), ('Vệ sinh lồng giặt'), ('Thay motor xả'), ('Sửa máy sấy')
        ) AS s(skill)
WHERE u.code = 'USR-015'
  AND NOT EXISTS (
    SELECT 1 FROM technician_skills ts WHERE ts.profile_id = tp.id AND ts.skill = s.skill
);

-- ---------------------------------------------------------------------
-- 5. EXTRA SERVICE AREAS
-- ---------------------------------------------------------------------

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (VALUES ('Quận 10'), ('Quận 11'), ('Quận Tân Bình')) AS a(area)
WHERE u.code = 'USR-012'
  AND NOT EXISTS (
    SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
);

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (VALUES ('Quận Tân Phú'), ('Quận Bình Tân'), ('Quận 6')) AS a(area)
WHERE u.code = 'USR-013'
  AND NOT EXISTS (
    SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
);

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (VALUES ('TP Thủ Đức'), ('Quận 9'), ('Quận Bình Thạnh')) AS a(area)
WHERE u.code = 'USR-014'
  AND NOT EXISTS (
    SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
);

INSERT INTO technician_service_areas (profile_id, area)
SELECT tp.id, a.area
FROM technician_profiles tp
         JOIN users u ON tp.user_id = u.id
         CROSS JOIN LATERAL (VALUES ('Quận 8'), ('Quận 5'), ('Quận 7')) AS a(area)
WHERE u.code = 'USR-015'
  AND NOT EXISTS (
    SELECT 1 FROM technician_service_areas ta WHERE ta.profile_id = tp.id AND ta.area = a.area
);

-- ---------------------------------------------------------------------
-- 6. EXTRA ORDERS — nhiều trạng thái để test
-- ---------------------------------------------------------------------

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, started_at, completed_at,
                    estimated_price, final_price, payment_method, warranty_months,
                    status, customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99301', 'Sửa tủ lạnh', 'Tủ không lạnh', 'Tủ lạnh',
       'Samsung Inverter 320L',
       'Tủ lạnh ngăn mát không lạnh, ngăn đá đóng tuyết nhiều.',
       '90 Kha Vạn Cân, TP Thủ Đức',
       NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days' + INTERVAL '20 minutes',
    NOW() - INTERVAL '10 days' + INTERVAL '3 hours',
    700000, 850000, 'VNPAY', 6,
    'COMPLETED',
    (SELECT id FROM users WHERE code = 'USR-009'),
    (SELECT id FROM users WHERE code = 'USR-014'),
    FALSE, NOW() - INTERVAL '11 days', NOW() - INTERVAL '10 days'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99301');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, started_at, completed_at,
                    estimated_price, final_price, payment_method, warranty_months,
                    status, customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99302', 'Sửa điện dân dụng', 'Thay CB tổng', 'Điện dân dụng',
       'CB Schneider 40A',
       'CB tổng thường xuyên nhảy khi bật máy lạnh và bếp từ.',
       '88 Sư Vạn Hạnh, Quận 10',
       NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '7 days' + INTERVAL '15 minutes',
    NOW() - INTERVAL '7 days' + INTERVAL '90 minutes',
    400000, 420000, 'MOMO', 3,
    'COMPLETED',
    (SELECT id FROM users WHERE code = 'USR-006'),
    (SELECT id FROM users WHERE code = 'USR-012'),
    FALSE, NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 days'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99302');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, started_at, completed_at,
                    estimated_price, final_price, payment_method, warranty_months,
                    status, customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99303', 'Sửa máy giặt', 'Máy không xả nước', 'Máy giặt',
       'Toshiba 8kg cửa trên',
       'Máy giặt báo lỗi E2, nước không xả ra ngoài.',
       '28 Phạm Thế Hiển, Quận 8',
       NOW() - INTERVAL '6 days',
    NOW() - INTERVAL '6 days' + INTERVAL '10 minutes',
    NOW() - INTERVAL '6 days' + INTERVAL '2 hours',
    350000, 380000, 'BANK_TRANSFER', 2,
    'COMPLETED',
    (SELECT id FROM users WHERE code = 'USR-010'),
    (SELECT id FROM users WHERE code = 'USR-015'),
    FALSE, NOW() - INTERVAL '7 days', NOW() - INTERVAL '6 days'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99303');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, estimated_price, status,
                    customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99304', 'Vệ sinh máy lạnh', 'Vệ sinh định kỳ', 'Máy lạnh',
       'LG Dual Inverter 1.5HP',
       'Máy lạnh lâu ngày chưa vệ sinh, gió yếu.',
       '19 Cộng Hòa, Tân Bình',
       NOW() + INTERVAL '3 hours',
    250000,
    'ASSIGNED',
    (SELECT id FROM users WHERE code = 'USR-007'),
    (SELECT id FROM users WHERE code = 'USR-004'),
    FALSE, NOW() - INTERVAL '1 day', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99304');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, estimated_price, status,
                    customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99305', 'Sửa máy nước nóng', 'Không nóng nước', 'Máy nước nóng',
       'Ariston 30L',
       'Máy nước nóng bật đèn nhưng nước không nóng.',
       '55 Lũy Bán Bích, Tân Phú',
       NOW() + INTERVAL '1 day',
    500000,
    'ASSIGNED',
    (SELECT id FROM users WHERE code = 'USR-011'),
    (SELECT id FROM users WHERE code = 'USR-013'),
    FALSE, NOW() - INTERVAL '3 hours', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99305');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, estimated_price, status,
                    customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99306', 'Sửa tủ lạnh', 'Tủ kêu lớn', 'Tủ lạnh',
       'Aqua 250L',
       'Tủ lạnh phát tiếng kêu lớn vào ban đêm.',
       '41 Phan Văn Trị, Gò Vấp',
       NOW() + INTERVAL '2 days',
    600000,
    'COMPLETED',
    (SELECT id FROM users WHERE code = 'USR-008'),
    (SELECT id FROM users WHERE code = 'USR-014'),
    FALSE, NOW() - INTERVAL '4 hours', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99306');

INSERT INTO orders (code, service_name, service_category, device_name, description,
                    address, expected_time, estimated_price,
                    status, customer_id, deleted, created_at, updated_at)
SELECT 'GU-99307',
       NULL, 'Điện dân dụng',
       'Ổ cắm âm tường',
       'Ổ cắm phòng khách bị cháy xém, cần thay gấp.',
       '12 Võ Văn Ngân, TP Thủ Đức',
       NOW() + INTERVAL '5 hours',
    250000,
    'NEW',
    (SELECT id FROM users WHERE code = 'USR-009'),
    FALSE, NOW() - INTERVAL '30 minutes', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99307');

INSERT INTO orders (code, service_name, service_category, device_name, description,
                    address, expected_time, estimated_price,
                    status, customer_id, deleted, created_at, updated_at)
SELECT 'GU-99308',
       NULL, 'Máy lọc nước',
       'Karofi KAQ-P95',
       'Máy lọc nước chảy yếu, nghi cần thay lõi.',
       '77 Tên Lửa, Bình Tân',
       NOW() + INTERVAL '1 day',
    300000,
    'NEW',
    (SELECT id FROM users WHERE code = 'USR-010'),
    FALSE, NOW() - INTERVAL '1 hour', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99308');

INSERT INTO orders (code, service_name, service_category, device_name, description,
                    address, expected_time, estimated_price,
                    status, customer_id, deleted, created_at, updated_at)
SELECT 'GU-99309',
       NULL, 'Bếp từ',
       'Bếp từ Sunhouse',
       'Bếp từ báo lỗi E0 và không nhận nồi.',
       '36 Trần Hưng Đạo, Quận 5',
       NOW() + INTERVAL '2 days',
    400000,
    'NEW',
    (SELECT id FROM users WHERE code = 'USR-011'),
    FALSE, NOW() - INTERVAL '90 minutes', NOW()
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99309');

INSERT INTO orders (code, service_name, sub_service, service_category, device_name, description,
                    address, scheduled_at, estimated_price, status,
                    customer_id, technician_id, deleted, created_at, updated_at)
SELECT 'GU-99310', 'Sửa máy lạnh', 'Máy không lạnh', 'Máy lạnh',
       'Daikin Inverter 1HP',
       'Máy lạnh vẫn chạy nhưng không lạnh.',
       '123 Nguyễn Văn Linh, Quận 7',
       NOW() - INTERVAL '1 day',
    550000,
    'CANCELLED',
    (SELECT id FROM users WHERE code = 'USR-002'),
    (SELECT id FROM users WHERE code = 'USR-004'),
    FALSE, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE code = 'GU-99310');

-- ---------------------------------------------------------------------
-- 7. EXTRA ORDER IMAGES
-- ---------------------------------------------------------------------

INSERT INTO order_images (order_id, url, role, created_at)
SELECT o.id, img.url, img.role, NOW()
FROM orders o
         JOIN (
    VALUES
        ('GU-99301', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30', 'request'),
        ('GU-99302', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', 'request'),
        ('GU-99303', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1', 'request'),
        ('GU-99304', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789', 'request'),
        ('GU-99305', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', 'request'),
        ('GU-99306', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5', 'request')
) AS img(order_code, url, role) ON img.order_code = o.code
WHERE NOT EXISTS (
    SELECT 1 FROM order_images oi WHERE oi.order_id = o.id AND oi.url = img.url
);

-- ---------------------------------------------------------------------
-- 8. EXTRA REVIEWS
-- ---------------------------------------------------------------------

INSERT INTO reviews (code, order_id, author_id, technician_id, rating, content, created_at)
SELECT 'REV-002', o.id,
       (SELECT id FROM users WHERE code = 'USR-009'),
       (SELECT id FROM users WHERE code = 'USR-014'),
       4,
       'Thợ sửa tốt, tủ lạnh chạy ổn lại. Giá hơi cao nhưng có giải thích rõ.',
       NOW() - INTERVAL '9 days'
FROM orders o
WHERE o.code = 'GU-99301'
  AND NOT EXISTS (SELECT 1 FROM reviews WHERE code = 'REV-002');

INSERT INTO reviews (code, order_id, author_id, technician_id, rating, content, created_at)
SELECT 'REV-003', o.id,
       (SELECT id FROM users WHERE code = 'USR-006'),
       (SELECT id FROM users WHERE code = 'USR-012'),
       5,
       'Làm nhanh, thay CB gọn gàng, tư vấn thêm cách dùng điện an toàn.',
       NOW() - INTERVAL '6 days'
FROM orders o
WHERE o.code = 'GU-99302'
  AND NOT EXISTS (SELECT 1 FROM reviews WHERE code = 'REV-003');

INSERT INTO reviews (code, order_id, author_id, technician_id, rating, content, created_at)
SELECT 'REV-004', o.id,
       (SELECT id FROM users WHERE code = 'USR-010'),
       (SELECT id FROM users WHERE code = 'USR-015'),
       4,
       'Máy giặt đã xả nước bình thường, thợ đến hơi trễ nhưng xử lý ổn.',
       NOW() - INTERVAL '5 days'
FROM orders o
WHERE o.code = 'GU-99303'
  AND NOT EXISTS (SELECT 1 FROM reviews WHERE code = 'REV-004');

-- ---------------------------------------------------------------------
-- 9. VERIFY
-- ---------------------------------------------------------------------

-- SELECT code, full_name, role, status FROM users ORDER BY code;
-- SELECT code, title FROM categories ORDER BY code;
-- SELECT u.code, u.full_name, tp.service_category, tp.is_available, tp.verification_status
-- FROM technician_profiles tp JOIN users u ON tp.user_id = u.id ORDER BY u.code;
-- SELECT code, service_category, status FROM orders ORDER BY code;
-- SELECT code, rating FROM reviews ORDER BY code;