/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*", // serve uploads via API
      }, {
        source: "/featured/:path*",
        destination: "/api/featured/:path*", // new feature route
      },
      { 
        source: "/feature/:path*",
        destination: "/api/feature/:path*", // new feature route
      },
       
      
      {
        source: "/brands/:path*",
        destination: "/api/brands/:path*", // new feature route
      },
      {
        source: "/images/:path*",
        destination: "/api/images/:path*", // new feature route
      },
      {
        source: "/icons/:path*",
        destination: "/api/icons/:path*", // new feature route
      },
    ];
  },
  // experimental options go here if supported in your version
};

export default nextConfig;
