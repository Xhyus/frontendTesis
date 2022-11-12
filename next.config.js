/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
}

module.exports = {
	env: {
		SERVIDOR: process.env.SERVIDOR,
		SERVIDOR2: process.env.SERVIDOR2,
		FRONTEND: process.env.FRONTEND,
	},
	nextConfig
};
