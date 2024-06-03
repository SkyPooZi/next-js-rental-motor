/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rental-motor.ruscarestudent.com',
            },
        ],
    },
}

module.exports = nextConfig
