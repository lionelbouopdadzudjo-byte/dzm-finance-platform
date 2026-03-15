export async function ocrProcess(fileUrl: string) {
  try {
    const res = await fetch(`${process.env.OCR_SERVICE_URL || "http://localhost:8000"}/ocr/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_url: fileUrl })
    });
    if (!res.ok) throw new Error("ocr error");
    return await res.json();
  } catch {
    return {
      document_type: "unknown",
      confidence: 0.45,
      fields: {},
      needs_review: true
    };
  }
}
