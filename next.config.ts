import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт в ./out — отдаём через nginx на VPS
  output: "export",
  // Ссылки /me -> /me/ и файлы /me/index.html (удобно для nginx)
  trailingSlash: true,
  // Дефолтный оптимизатор картинок недоступен в static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
