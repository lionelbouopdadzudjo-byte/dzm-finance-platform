insert into owner_account (id, full_name, email, telegram_chat_id) values
('11111111-1111-1111-1111-111111111111', 'Proprietaire DZM', 'owner@dzm.local', '12345')
on conflict do nothing;

insert into business_units (id, owner_account_id, code, name) values
('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'DZM_A', 'DZM A'),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'DZM_B', 'DZM B')
on conflict do nothing;

insert into supplier_profile (id, owner_account_id, supplier_code, supplier_name, is_exclusive_supplier) values
('33333333-3333-3333-3333-333333333333','11111111-1111-1111-1111-111111111111','DT_AZIMUT','DT AZIMUT',true)
on conflict do nothing;

-- note: remplacer uploaded_by/author_id/recipient_profile_id avec de vrais UUID auth.users en environnement Supabase réel.
insert into documents (id, owner_account_id, business_unit_id, uploaded_by, source, doc_type, original_filename, mime_type, cloudinary_public_id, cloudinary_url, file_hash, perceptual_hash, status, ocr_confidence, search_text, metadata_json)
values
('44444444-4444-4444-4444-444444444441','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','web','invoice','inv-a-001.jpg','image/jpeg','dzm/inv-a-001','https://res.cloudinary.com/demo/image/upload/sample.jpg','hash-1','phash-1','processed',0.95,'INV-2025-001 DZM A DT AZIMUT', '{}'),
('44444444-4444-4444-4444-444444444442','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','telegram','payment_proof','pay-b-001.jpg','image/jpeg','dzm/pay-b-001','https://res.cloudinary.com/demo/image/upload/sample.jpg','hash-2','phash-2','needs_review',0.56,'PAYMENT DZM B DT AZIMUT', '{}'),
('44444444-4444-4444-4444-444444444443','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','api','invoice','inv-a-002.jpg','image/jpeg','dzm/inv-a-002','https://res.cloudinary.com/demo/image/upload/sample.jpg','hash-3','phash-3','processed',0.91,'INV-2025-003 DZM A DT AZIMUT', '{}');

insert into invoices (id, owner_account_id, business_unit_id, document_id, supplier_profile_id, invoice_number, issue_date, due_date, total_amount, paid_amount, balance_due, status, extraction_json, search_text)
values
('55555555-5555-5555-5555-555555555551','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','44444444-4444-4444-4444-444444444441','33333333-3333-3333-3333-333333333333','INV-2025-001','2025-03-01','2025-03-10',200000,200000,0,'paid','{}','INV-2025-001 DT AZIMUT DZM A'),
('55555555-5555-5555-5555-555555555552','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','44444444-4444-4444-4444-444444444442','33333333-3333-3333-3333-333333333333','INV-2025-002','2025-03-04','2025-03-11',300000,0,300000,'overdue','{}','INV-2025-002 DT AZIMUT DZM B'),
('55555555-5555-5555-5555-555555555553','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','44444444-4444-4444-4444-444444444443','33333333-3333-3333-3333-333333333333','INV-2025-003','2025-03-09','2025-03-16',450000,200000,250000,'partially_paid','{}','INV-2025-003 DT AZIMUT DZM A');

insert into payments (id, owner_account_id, business_unit_id, document_id, supplier_profile_id, reference, beneficiary_name, provider, payment_date, amount, status, extraction_json, search_text)
values
('66666666-6666-6666-6666-666666666661','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','44444444-4444-4444-4444-444444444441','33333333-3333-3333-3333-333333333333','INV-2025-001','DT AZIMUT','mtn',now(),200000,'matched','{}','Paiement INV-2025-001'),
('66666666-6666-6666-6666-666666666662','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','44444444-4444-4444-4444-444444444442','33333333-3333-3333-3333-333333333333','SANS_REF','DT AZIMUT','bank',now(),120000,'unmatched','{}','Paiement non rapproche'),
('66666666-6666-6666-6666-666666666663','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','44444444-4444-4444-4444-444444444443','33333333-3333-3333-3333-333333333333','INV-2025-003','DT AZIMUT','orange',now(),200000,'partially_allocated','{}','Paiement partiel INV-2025-003');

insert into invoice_payment_matches (id, owner_account_id, business_unit_id, invoice_id, payment_id, match_score, match_reason, allocation_amount, status)
values
('77777777-7777-7777-7777-777777777771','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','55555555-5555-5555-5555-555555555551','66666666-6666-6666-6666-666666666661',95,'{"exact_amount":true,"reference":true}',200000,'auto_confirmed'),
('77777777-7777-7777-7777-777777777772','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','55555555-5555-5555-5555-555555555553','66666666-6666-6666-6666-666666666663',72,'{"close_amount":true,"reference":true}',200000,'partial_allocation');

insert into anomalies (id, owner_account_id, business_unit_id, related_type, related_id, severity, code, message, status)
values
('88888888-8888-8888-8888-888888888881','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','invoice','55555555-5555-5555-5555-555555555552','high','INVOICE_OVERDUE','Facture en retard','open'),
('88888888-8888-8888-8888-888888888882','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','document','44444444-4444-4444-4444-444444444442','medium','LOW_OCR_CONFIDENCE','OCR faible','open'),
('88888888-8888-8888-8888-888888888883','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','payment','66666666-6666-6666-6666-666666666662','medium','PAYMENT_WITHOUT_INVOICE','Paiement sans facture associée','open');

insert into alerts (id, owner_account_id, business_unit_id, type, title, message, channel, status)
values
('99999999-9999-9999-9999-999999999991','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','critical','Alerte OCR','Document à revoir','telegram','pending'),
('99999999-9999-9999-9999-999999999992','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','warning','Alerte matching','Paiement partiel à allouer','in_app','sent');

insert into activity_logs (owner_account_id, business_unit_id, actor_id, action, entity_type, entity_id, metadata)
values
('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222221','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','invoice_created','invoice','55555555-5555-5555-5555-555555555553','{"source":"seed"}');

insert into forecast_snapshots (owner_account_id, business_unit_id, kind, payload)
values
('11111111-1111-1111-1111-111111111111',null,'cashflow','{"next_30d":680000,"risk":"medium"}');
