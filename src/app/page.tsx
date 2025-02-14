import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import { HeroSection } from "@src/components/PageFragments/HeroSection/HeroSection";
import { ShareYourSetup } from "@src/components/PageFragments/ShareYourSetup/ShareYourSetup";
import { Inspirations } from "@src/components/PageFragments/Inspirations/Inspirations";

const { description, title } = SEODATA.home;
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

const page = () => {
	return (
		<AppLayout>
			<HeroSection />
			<main className='pt-5 lg:pt-12 mx-auto max-w-[1256px] sm:mt-3 mb-5'>
				{/* <AllCategorySection /> */}
				<div className='mt-4 sm:mt-12'>
					<SortedProducts />
				</div>
			</main>
			<Inspirations />
      		<ShareYourSetup />
		</AppLayout>
	);
};

export default page;
