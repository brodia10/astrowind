module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'campaign-dark-blue': '#002E5D', // Dark blue for footer background
				'campaign-light-blue': '#004C99', // Lighter blue for hover states
				'campaign-green': '#009688', // Teal green for buttons
				'campaign-orange': '#FF5722', // Orange for button borders and hover states
				'campaign-gray': '#E0E0E0', // Light gray for borders and backgrounds
				// Other colors can be added here as needed
			}
		},
	},
	plugins: [],
};
