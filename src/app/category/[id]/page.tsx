import AppLayout from "@src/components/AppLayout";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import { WooCommerceServer } from "@utils/endpoints";

export async function generateStaticParams() {
	try {
		// Fetch categories from WooCommerce
		const response = await WooCommerceServer.get("products/categories");
		const categories = response.data;

		const categoriesSorted: string[] = categories?.map(
			(category: { id: number; slug: string }) =>
				`${category?.slug}-${category?.id}`,
		);

		return categoriesSorted?.map((id) => ({ id }));
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

const page = () => {
	return (
		<AppLayout>
			<main className='flex flex-col slg:flex-row gap-4 w-full mt-32 slg:mt-28 px-2 sm:px-12 mx-auto'>
				<MainCategorySection />
			</main>
		</AppLayout>
	);
};

export default page;
