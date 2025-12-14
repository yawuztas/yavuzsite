"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PDFConvert() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setResult({
          pdf: `data:application/pdf;base64,${data.pdf}`,
          txt: `data:text/plain;base64,${data.txt}`,
        });
      } else {
        setError(data.error || "Dönüştürme başarısız oldu.");
      }
    } catch (err) {
      setLoading(false);
      setError("Bağlantı hatası: " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header with Back Button */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-700 bg-gray-900/40 backdrop-blur-md">
        <Link href="/" className="text-2xl font-semibold tracking-tight hover:text-blue-400 transition">
          ← Yavuz Taş
        </Link>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            📄 PDF OCR Dönüştürücü
          </h1>
          <p className="text-gray-400 text-xl">
            PDF&apos;yi yükle → OCR ile metne dönüştür → hem PDF hem TXT olarak indir
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/60 border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-blue-500 transition"
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
            id="pdf-upload"
            disabled={loading}
          />
          <label
            htmlFor="pdf-upload"
            className={`cursor-pointer flex flex-col items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="text-6xl mb-4">📎</div>
            <p className="text-xl font-semibold mb-2">
              {fileName || "PDF dosyası seçin veya sürükleyip bırakın"}
            </p>
            <p className="text-gray-500">Maksimum dosya boyutu: 10MB</p>
          </label>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-blue-900/30 border border-blue-500 rounded-xl p-8 text-center"
          >
            <div className="animate-spin text-6xl mb-4">🌀</div>
            <p className="text-xl text-blue-400 font-semibold">OCR işlemi sürüyor...</p>
            <p className="text-gray-400 mt-2">Bu birkaç saniye sürebilir</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 bg-red-900/30 border border-red-500 rounded-xl p-6"
          >
            <p className="text-red-400 font-semibold text-lg">❌ {error}</p>
          </motion.div>
        )}

        {/* Success State with Download Buttons */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-green-900/20 border border-green-500 rounded-xl p-8"
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-2xl font-bold text-green-400">Dönüştürme Başarılı!</h3>
              <p className="text-gray-400 mt-2">Dosyanızı aşağıdan indirebilirsiniz</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href={result.pdf}
                download="converted.pdf"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition"
              >
                <span>📘</span>
                <span>OCR&apos;li PDF&apos;ı İndir</span>
              </motion.a>
              <motion.a
                href={result.txt}
                download="converted.txt"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-500 hover:to-green-600 transition"
              >
                <span>📄</span>
                <span>Metin (TXT) İndir</span>
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">👁️</div>
            <h4 className="font-semibold text-lg mb-2">Güçlü OCR</h4>
            <p className="text-gray-400 text-sm">Tesseract.js ile yüksek doğruluklu metin tanıma</p>
          </div>
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold text-lg mb-2">Hızlı İşlem</h4>
            <p className="text-gray-400 text-sm">Saniyeler içinde dönüştürme işlemi tamamlanır</p>
          </div>
          <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h4 className="font-semibold text-lg mb-2">Güvenli</h4>
            <p className="text-gray-400 text-sm">Dosyalarınız sunucuda saklanmaz</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}