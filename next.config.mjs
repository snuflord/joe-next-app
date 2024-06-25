/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'deserving-diamond-d7c8c98222.media.strapiapp.com'],
        formats: ['image/avif', 'image/webp',],
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/image/upload/**',
        },
        ],
    },
};

export default nextConfig;