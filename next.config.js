module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/seoul-open-api/:path*",
        destination: "http://openapi.seoul.go.kr:8088/:path*",
        secure: true, // HTTPS 요청으로 전송
      },
    ];
  },
};
