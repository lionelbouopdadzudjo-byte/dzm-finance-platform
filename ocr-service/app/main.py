from fastapi import FastAPI
from pydantic import BaseModel
from app.ocr_pipeline import process_document

app = FastAPI(title="DZM OCR Service")

class OCRRequest(BaseModel):
    file_url: str

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/ocr/process")
def ocr_process(req: OCRRequest):
    return process_document(req.file_url)
