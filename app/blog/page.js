"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
  const [lang, setLang] = useState("en");
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch blog posts
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []));
  }, []);

  const t = {
    tr: {
      title: "Blog",
      subtitle: "AI, Otomasyon ve Teknoloji Hakkında Yazılarım",
      allPosts: "Tüm Yazılar",
      readMore: "Devamını Oku",
      readingTime: "dakika okuma",
      noPosts: "Henüz yazı yok.",
    },
    en: {
      title: "Blog",
      subtitle: "My Writings on AI, Automation, and Technology",
      allPosts: "All Posts",
      readMore: "Read More",
      readingTime: "min read",
      noPosts: "No posts yet.",
    },
  };

  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter((post) => post.tags?.includes(filter));

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-700 bg-gray-900/40 backdrop-blur-md">
        <Link href="/" className="text-2xl font-semibold tracking-tight hover:text-blue-400 transition">
          ← Yavuz Taş
        </Link>
        <select
          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="tr">TR</option>
          <option value="en">EN</option>
        </select>
      </nav>

      {/* Hero */}
      <section className="py-20 px-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          {t[lang].title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400"
        >
          {t[lang].subtitle}
        </motion.p>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="px-10 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {t[lang].allPosts}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-6 py-2 rounded-full transition ${
                  filter === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="px-10 pb-20">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">{t[lang].noPosts}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500 transition"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readingTime} {t[lang].readingTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-white hover:text-blue-400 transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-900/30 text-blue-400 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-blue-400 font-medium hover:underline">
                      {t[lang].readMore} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
