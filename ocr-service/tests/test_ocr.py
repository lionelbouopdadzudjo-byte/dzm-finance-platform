from app.ocr_pipeline import classify_document, process_document


def test_classification():
    assert classify_document("facture inv-2025-001") == "invoice"
    assert classify_document("transaction mtn") == "payment_proof"


def test_extraction_fields():
    out = process_document("http://example.com/doc.jpg")
    assert out["document_type"] in ["invoice", "payment_proof", "unknown"]
    assert isinstance(out["fields"], dict)


def test_confidence_threshold():
    out = process_document("http://example.com/doc.jpg")
    assert 0 <= out["confidence"] <= 1
    assert isinstance(out["needs_review"], bool)
