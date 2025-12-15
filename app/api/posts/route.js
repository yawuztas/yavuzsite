import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ posts: [] });
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Calculate reading time (approximate)
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/g).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || content.substring(0, 150) + "...",
          tags: data.tags || [],
          readingTime,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ posts: [] });
  }
}
