/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = {
	env: {
		SERVIDOR: process.env.SERVIDOR,
		SERVIDOR2: process.env.SERVIDOR2,
	},
	nextConfig
};
