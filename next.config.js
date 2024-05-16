module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/seoul-open-api/:path*",
        destination: "http://openapi.seoul.go.kr:8088/:path*", // 프록시할 대상 서버 주소
      },
    ];
  },
};
