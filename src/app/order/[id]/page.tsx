import AppLayout from "@src/components/AppLayout";
import { Back } from "@src/components/Reusables";
import OrderDataContainer from "../_components/OrderDataContainer";
import { WooCommerceServer } from "@utils/endpoints";

export async function generateStaticParams() {
	try {
		// Fetch categories from WooCommerce
		const response = await WooCommerceServer.get("orders");
		const orders = response.data;

		const ordersSorted: string[] = orders?.map(
			(order: { id: number }) => `${order?.id}`,
		);

		return ordersSorted?.map((id) => ({ id }));
	} catch (error) {
		console.error("Error fetching orders:", error);
		return [];
	}
}

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-20 slg:mt-12'>
				<section className='flex w-full flex-col items-center pt-16 slg:px-6 text-center pb-10'>
					<div className='w-full mb-5'>
						<Back />
					</div>
					<OrderDataContainer />
				</section>
			</main>
		</AppLayout>
	);
};

export default page;
