/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: 'effervescent-goshawk-546.convex.cloud'
            }
        ]
    }
};

export default nextConfig;
