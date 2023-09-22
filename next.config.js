/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'robohash.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
                port: '',
                pathname: '/media/**',
            },
        ],
    },

};

module.exports = nextConfig;
