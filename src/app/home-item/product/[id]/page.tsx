import AppLayout from "@src/components/AppLayout";
import ProductDisplaySection from "@src/components/PageFragments/ProductDisplaySection";
import { Back } from "@src/components/Reusables";
import { WooCommerceServer } from "@utils/endpoints";

import React from "react";

interface ProductIdProps {
	params: { id: string };
}

export async function generateStaticParams() {
	try {
		// Fetch categories from WooCommerce
		const response = await WooCommerceServer.get("products");
		const products = response.data;

		const productsSorted: string[] = products?.map(
			(product: { id: number; slug: string }) =>
				`${product?.slug}-${product?.id}`,
		);

		return productsSorted?.map((id) => ({ id }));
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

const page = async ({ params: { id } }: ProductIdProps) => {
	const lastPart = id.split("/").pop();
	const formatedId = lastPart?.match(/-(\w+)$/)?.[1];

	return (
		<AppLayout>
			<main className='mt-32 lg:mt-24 mx-auto max-w-[1156px] min-h-[50vh]'>
				<Back />
				<ProductDisplaySection FormatedId={formatedId} />
			</main>
		</AppLayout>
	);
};

export default page;
