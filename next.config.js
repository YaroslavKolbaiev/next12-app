/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "iRick",
    mongodb_password: "nnrVi69PSk47dpRE",
    mongodb_clustername: "cluster0",
    mongodb_database: "posts-app",
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
