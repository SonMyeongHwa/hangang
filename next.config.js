const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/getCityPerson/:path*",
        destination: `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_ACCESSKEY}/json/citydata_ppltn/1/5/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;