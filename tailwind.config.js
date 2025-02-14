module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"custom-gradient":
					"linear-gradient(304.63deg, #005B96 10%, #3AA3A1 30%, #1E3A4F 60%, #13171D 90%)",
				"banner-gradient":
					"linear-gradient(132.84deg, #2C7C7A 17.74%, #B7743E 74.06%)",
				"black-gradient":
					" linear-gradient(91.16deg, rgba(217, 217, 217, 0.61) -3.62%, rgba(217, 217, 217, 0) 123.06%)",
				firstBannerBg: "url('/dev-images/Mother Frame.png')",
			},
			colors: {
				light: "#E8F0F9", // Cool light blue
				background: "#E3ECF8", // Slightly darker background with a bluish tones
				gray: {
					100: "#E4E2DA", // Very light gray with warmth
  					200: "#B0AC9F", // Muted medium gray
				},
				primary: "#B88E2F", // Deep gold for primary accents
				effect: "#FFD700", // Golden yellow for highlighting effects
				primaryColor: {
					100: "#00BFFF", // Sky blue
					200: "#0099CC", // Medium blue
					300: "#005F99", // Ocean blue
					400: "#003F66", // Darker, muted teal
				},

				dark: "#0D1B2A", // Rich, deep navy blue
				text_color: "#1C2541", // Neutral dark tone for text
				gray: {
					100: "#ccc",
				},
				secondary: {
					200: "#23395B", // Medium-dark blue-gray
					300: "#4F6272", // Muted grayish blue
					400: "#3A506B", // Slightly lighter than 200
					500: "#778899", // Muted steel blue
					600: "#D0E1F9", // Pale sky blue
					700: "#98AFC7", // Softer slate blue
					800: "#B0C4DE", // Light steel blue
				},
				orange: "#FF4500", // Bright orange for attention-grabbing elements
				green: {
					100: "#B88E2F",
				},
			},

			animation: {
				"spin-slow": "spin 8s linear infinite",
			},
			fontSize: {
				xxs: "10px",
				mxs: "8px",
				md: "16px",
			},
			screens: {
				xs: "400px",
				slg: "999px", // @media (min-width: 999px)
				xmd: "800px", // @media (min-width: 800px)
				...require("tailwindcss/defaultTheme").screens,
			},
		},
	},
	plugins: [],
};
