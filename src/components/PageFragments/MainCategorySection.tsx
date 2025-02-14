"use client";
import { electonicsBannerImageNameImg1 } from "@public/images";
import React, { useState } from "react";
import MainProductCard from "../Cards/MainProductCard";
import { usePathname } from "next/navigation";
import { Product, ProductResponse, mainProductCardData } from "@constants";
import PaginationComponent from "../Reusables/PaginationComponent";
import { ScaleLoader } from "react-spinners";
import ProductCard2 from "../Cards/ProductCard2";
import { Back } from "../Reusables";
import { useProductsByCategory } from "../lib/woocommerce";

const MainCategorySection = () => {
	const pathname = usePathname();
	const match = pathname.match(/\/category\/([^-]+)/);
	const parts = pathname.split("-");
	const numberAfterDash = parts[parts.length - 1];
	let usedWord: any = null;
	const itemsPerPage = "12";
	const [currentPage, setCurrentPage] = useState(1);
	// console.log(selectedOption)
	if (match && match[1]) {
		usedWord = match[1];
	}

	// Woo commerce API Product
	const {
		data: categoryProducts,
		isLoading: categoryProductsWpIsLoading,
		isError: categoryProductsIsError,
	} = useProductsByCategory(numberAfterDash);

	const CategoryProducts: ProductType[] = categoryProducts;

	const totalDocs = CategoryProducts?.length;

	// React-paginate uses 0-based indexing

	const handlePageChange = (selected: number) => {
		setCurrentPage(selected);
	};
	let totalPages;
	if (totalDocs) {
		totalPages = Math.ceil(totalDocs / parseInt(itemsPerPage));
	}
	return (
		<section
			className={`flex w-full flex-col items-center gap-3 sm:gap-4 mb-12 pb-8`}
		>
			{CategoryProducts && (
				<>
					{CategoryProducts?.length > 0 && (
						<div className='w-full px-2 space-y-2'>
							<Back />
							<div className='flex w-fit gap-2 items-center text-xl sm:text-2xl font-medium tracking-tight text-black'>
								<h4
									dangerouslySetInnerHTML={{
										__html: CategoryProducts[0]?.categories[0]?.name,
									}}
								/>
								({totalDocs})
							</div>
						</div>
					)}
					{CategoryProducts?.length > 0 && (
						<div className='bg-white py-3 w-full min-h-[400px]'>
							<div className='grid grid-cols-2 w-full sm:flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-8 sm:px-0 sm:mt-3'>
								{CategoryProducts?.length > 0 &&
									CategoryProducts?.map((product) => (
										<ProductCard2
											key={product?.id}
											id={product?.id}
											image={product?.images[0]?.src}
											oldAmount={product?.regular_price}
											newAmount={product?.price}
											description={product?.name}
										/>
									))}
							</div>
						</div>
					)}
					{CategoryProducts?.length === 0 && (
						<div className='flex w-full flex-col gap-4 items-center justify-center min-h-[40vh] bg-white'>
							<h4 className='font-[500] text-base'>
								No Product in this category
							</h4>
							<h4 className='text-xl slg:text-3xl font-semibold'>
								Check back later
							</h4>
						</div>
					)}
				</>
			)}
			{categoryProductsWpIsLoading && (
				<div className='flex w-full justify-center mt-6'>
					<ScaleLoader color='#005B96' />
				</div>
			)}
			{totalPages && totalPages > 1 && (
				<PaginationComponent
					pageCount={totalPages}
					onPageChange={handlePageChange}
					forcePage={0}
				/>
			)}
		</section>
	);
};

export default MainCategorySection;
