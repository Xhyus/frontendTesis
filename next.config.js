/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
}

module.exports = {
	env: {
		SERVIDOR: process.env.SERVIDOR,
		FRONTEND: process.env.FRONTEND
	},
	nextConfig
};
