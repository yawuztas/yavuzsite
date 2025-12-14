import { NextResponse } from "next/server";
import Tesseract from "tesseract.js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Configure pdfjs worker for server-side rendering
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ success: false, error: "PDF dosyası eksik." });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // PDF metin çıkarımı
    let text = "";
    try {
      const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText + "\n";
      }
    } catch (err) {
      console.warn("pdfjs-dist metin çıkarımı başarısız:", err);
    }

    // OCR fallback
    if (text.trim().length < 50) {
      console.log("⚙️ OCR devrede...");
      const ocrResult = await Tesseract.recognize(uint8Array, "tur+eng");
      text = ocrResult.data.text.trim();
    }

    // Yeni PDF oluşturma
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const { width, height } = page.getSize();
    let y = height - 50;

    for (const line of text.split("\n")) {
      page.drawText(line, { x: 50, y, size: fontSize, font, color: rgb(1, 1, 1) });
      y -= 16;
      if (y < 50) {
        y = height - 50;
        pdfDoc.addPage();
      }
    }

    const newPdfBytes = await pdfDoc.save();

    return NextResponse.json({
      success: true,
      pdf: Buffer.from(newPdfBytes).toString("base64"),
      txt: Buffer.from(text).toString("base64"),
    });
  } catch (err) {
    console.error("Convert hatası:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}