const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_ACCESSKEY}/json/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;