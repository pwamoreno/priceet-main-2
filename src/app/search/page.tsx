"use client";
import AppLayout from "@src/components/AppLayout";
import SearchDataOutput from "@src/components/PageFragments/SearchDataOutput";
import { useProductSearch } from "@src/components/lib/woocommerce";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Page = () => {
	const searchParams = useSearchParams().toString();
	const search = searchParams.replace(/=$/, "").toLowerCase();
	const {
		data: products,
		isLoading: ProductWpIsLoading,
		isError: ProductIsError,
	} = useProductSearch(search);

	const Products: ProductType[] = products;
	const ProductsTotal = Products?.length;

	return (
		<AppLayout className='px-2'>
			<main className='bg-white flex flex-col items-center relative justify-center w-full pt-4 sm:pt-10 mt-32 slg:mt-40 xl:pt-5 mx-auto max-w-[1156px] min-h-[50vh] mb-20'>
				{ProductsTotal === 0 ? (
					<div className=''>
						<h3 className='text-2xl text-center tracking-tight text-secondary-200'>
							Sorry, we can not find this product 😞
						</h3>
					</div>
				) : (
					<>
						<div className='flex w-full py-3 px-5 bg-primary/30 absolute top-0 text-base'>
							Total&nbsp;
							<span className='font-semibold'>{ProductsTotal}</span>
							&nbsp;items Found
						</div>
						<SearchDataOutput data={Products} isloading={ProductWpIsLoading} />
					</>
				)}
				{ProductWpIsLoading && <ScaleLoader color='#005B96' />}
			</main>
		</AppLayout>
	);
};

export default Page;
