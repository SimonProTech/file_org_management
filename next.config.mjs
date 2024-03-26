/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: 'https',
                hostname: 'effervescent-goshawk-546.convex.cloud'
            },
            {
                protocol: 'https',
                hostname: 'cdn.buymeacoffee.com'
            }
        ]
    }
};

export default nextConfig;
