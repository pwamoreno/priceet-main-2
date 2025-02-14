import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@styles/globals.css";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import { Karla } from "next/font/google";
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const karla = Karla({
	subsets: ["latin"], // Use "latin" unless you need additional subsets like "latin-ext"
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal"], // Include "italic" if you need it
});

const { description, title } = SEODATA.default;
export const metadata: Metadata = {
	title: title,
	description: description,
	icons: SEODATA.defaultOGImage,
	openGraph: {
		images: [
			{
				url: SEODATA.defaultOGImage,
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${karla.className} bg-white w-full min-h-screen`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
