/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: false,
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'www.gstatic.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'hostaway-platform.s3.us-west-2.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
