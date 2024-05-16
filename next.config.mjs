/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_ACCESSKEY}/json/citydata_ppltn/1/5/:path*`,
      },
    ];
  },
};

export default nextConfig;
