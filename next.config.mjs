/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'drive.usercontent.google.com',
            port: '',
            pathname: '*/**',
          },
          {
            protocol: 'https',
            hostname: 'www.dropbox.com',
            port: '',
            pathname: '*/**',
          },
        ],
      },
};

export default nextConfig;
