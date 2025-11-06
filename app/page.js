"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [lang, setLang] = useState("tr");

  const t = {
    tr: {
      nav: ["Projeler", "Hakkında", "Temas"],
      heroTitle: "Yavuz Taş — Yapay Zeka Geliştiricisi & Freelancer",
      heroDesc:
        "Akıllı otomasyon sistemleri, gelişmiş OCR çözümleri ve yapay zeka destekli ticaret botları geliştiriyorum. Teknolojiyi yaratıcı ve eğlenceli bir hale getirmeye inanıyorum.",
      viewProjects: "Projeleri Gör",
      contact: "İletişime Geç",
      projectsTitle: "Öne Çıkan Projeler",
      aboutTitle: "Hakkımda",
      aboutText: `Merhaba! Ben Yavuz Taş — yapay zeka, otomasyon ve veri odaklı sistemler geliştiren bir yazılım geliştiricisiyim. 
Projelerimde hem teknik mükemmeliyet hem de kullanıcı deneyimini eğlenceli hale getirmeyi hedefliyorum. 
📊 Finans, üretkenlik ve dil teknolojilerinde yenilikçi çözümler üretmeyi seviyorum. 🚀 Hedefim, yapay zekayı herkesin erişebileceği güçlü ama keyifli bir araca dönüştürmek.`,
      footer: "❤️ ile geliştirildi & Next.js / Tailwind destekli",
    },
    en: {
      nav: ["Projects", "About", "Contact"],
      heroTitle: "Yavuz Taş — AI Developer & Freelancer",
      heroDesc:
        "I develop smart automation systems, advanced OCR solutions, and AI-powered trading bots. I believe in making technology creative and fun.",
      viewProjects: "View Projects",
      contact: "Contact Me",
      projectsTitle: "Featured Projects",
      aboutTitle: "About Me",
      aboutText: `Hi! I'm Yavuz Taş — a software developer focusing on AI, automation, and data-driven systems. 
My goal is to combine technical excellence with enjoyable user experiences. 
📊 I love building innovative solutions in finance, productivity, and language technologies. 🚀 My mission is to make AI accessible, powerful, and fun for everyone.`,
      footer: "❤️ Built with Next.js / Tailwind",
    },
  };

  const projects = [
    { href: "/video-analysis", title: lang === "tr" ? "Video Çözümleme" : "Video Analyzer", desc: lang === "tr" ? "Video dosyalarını analiz eden ve önemli anları/özetleri çıkaran akıllı çözümleyici." : "An intelligent video analyzer that extracts highlights and summaries." },
    { href: "/binance-bot", title: lang === "tr" ? "Binance Botu" : "Binance Bot", desc: lang === "tr" ? "Gerçek zamanlı işlem sinyalleri ve performans panosu — sonuçlar canlı gösterilir." : "Real-time trading signals and performance dashboard." },
    { href: "/investment-bot", title: lang === "tr" ? "Yatırım Botu" : "Investment Bot", desc: lang === "tr" ? "Çeşitli stratejilerle portföy yönetimi ve otomatik al-sat stratejileri." : "Portfolio management and auto-trading strategies." },
    { href: "/pdf-printer", title: lang === "tr" ? "PDF Yazıcı" : "PDF Printer", desc: lang === "tr" ? "Dokümanları düzenleme ve PDF olarak çıktı alma/otomatikleştirme aracı." : "Tool for editing documents and exporting to PDF." },
    { href: "/video-downloader", title: lang === "tr" ? "Link Video İndirme Aracı" : "Video Downloader", desc: lang === "tr" ? "URL'den video indirip farklı formatlara dönüştüren araç." : "Download videos from URLs and convert formats." },
    { href: "/bist-bot", title: lang === "tr" ? "BIST Borsa Robotu" : "BIST Stock Bot", desc: lang === "tr" ? "BIST piyasalarına yönelik algoritmik işlem stratejileri." : "Algorithmic trading bot for Turkish markets." },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-[Poppins]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-700 bg-gray-900/40 backdrop-blur-md">
        <div className="text-2xl font-semibold tracking-tight hover:text-blue-400 transition">
          Yavuz Taş
        </div>
        <div className="flex gap-8 text-lg">
          <a href="#projects" className="hover:text-blue-400 transition">
            {t[lang].nav[0]}
          </a>
          <a href="#about" className="hover:text-blue-400 transition">
            {t[lang].nav[1]}
          </a>
          <a href="#contact" className="hover:text-blue-400 transition">
            {t[lang].nav[2]}
          </a>
        </div>
        <select
          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="tr">TR</option>
          <option value="en">EN</option>
        </select>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center py-32 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {t[lang].heroTitle}
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl max-w-2xl mb-10 leading-relaxed">
          {t[lang].heroDesc}
        </p>
        <div className="flex gap-6">
          <a
            href="#projects"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-6 py-3 rounded-xl text-lg font-medium transition"
          >
            {t[lang].viewProjects}
          </a>
          <a
            href="#contact"
            className="border border-blue-400 px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-400/20 transition"
          >
            {t[lang].contact}
          </a>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="px-10 py-20 bg-gray-900/40 backdrop-blur-md">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t[lang].projectsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((p) => (
            <motion.a
              key={p.href}
              href={p.href}
              whileHover={{ scale: 1.04 }}
              className="border border-gray-700 rounded-2xl p-6 bg-gray-800/50 hover:border-blue-500 transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-400">
                  {p.title}
                </h3>
                <p className="text-gray-400 mb-4">{p.desc}</p>
              </div>
              <span className="text-blue-300 font-medium">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-10 py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">{t[lang].aboutTitle}</h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
          {t[lang].aboutText}
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-10 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} Yavuz Taş — {t[lang].footer}
        </p>
      </footer>
    </main>
  );
}