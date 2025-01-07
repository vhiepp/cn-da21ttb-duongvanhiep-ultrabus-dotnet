/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "http://localhost:5200",
      "storage.googleapis.com",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
