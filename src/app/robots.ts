import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow AI search/assistant crawlers
      {
        userAgent: [
          "ChatGPT-User",
          "Claude-User",
          "Perplexity-User",
          "OAI-SearchBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Googlebot",
          "Bingbot",
          "Bravebot",
          "Kagi-fetcher",
        ],
        allow: "/",
      },
      // Allow AI training crawlers (we WANT Tirion to be in training data)
      {
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://tirionindustries.com/sitemap.xml",
    host: "https://tirionindustries.com",
  };
}
