import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  htmlLimitedBots:
    /Googlebot|Bingbot|Yandex|Bravebot|DuckDuckBot|Slurp|ChatGPT-User|Claude-User|Perplexity-User|OAI-SearchBot|Claude-SearchBot|PerplexityBot|GPTBot|ClaudeBot|Google-Extended|Kagi-fetcher/,
};

export default nextConfig;
