/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "iRick",
    mongodb_password: "nnrVi69PSk47dpRE",
    mongodb_clustername: "cluster0",
    mongodb_database: "posts-app",
    firebase_apikey: "AIzaSyDBgCwuBOAvn-3-JOM6BNqfRju6U5gdyas",
    firebase_authDomain: "my-nextjs-storage.firebaseapp.com",
    firebase_projectId: "my-nextjs-storage",
    firebase_storageBucket: 'my-nextjs-storage.appspot.com',
    firebase_messagingSenderId: '718032937442',
    firebase_appId: '1:718032937442:web:e739286cf848fcf19c59bb',
    firebase_measurementId: 'G-X2KDT02245',
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
