"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactForm({ lang }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const t = {
    tr: {
      name: "Adınız",
      email: "E-posta",
      message: "Mesajınız",
      send: "Gönder",
      sending: "Gönderiliyor...",
      success: "Mesajınız başarıyla gönderildi!",
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
      nameRequired: "Ad alanı zorunludur",
      emailRequired: "E-posta alanı zorunludur",
      emailInvalid: "Geçerli bir e-posta adresi girin",
      messageRequired: "Mesaj alanı zorunludur",
    },
    en: {
      name: "Your Name",
      email: "Email",
      message: "Your Message",
      send: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred. Please try again.",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      messageRequired: "Message is required",
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error(t[lang].nameRequired);
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(t[lang].emailRequired);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t[lang].emailInvalid);
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(t[lang].messageRequired);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Send email via API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t[lang].success);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(t[lang].error);
      }
    } catch (error) {
      toast.error(t[lang].error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t[lang].name}
          className="w-full px-6 py-4 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t[lang].email}
          className="w-full px-6 py-4 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t[lang].message}
          rows="6"
          className="w-full px-6 py-4 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? t[lang].sending : t[lang].send}
      </motion.button>
    </motion.form>
  );
}
