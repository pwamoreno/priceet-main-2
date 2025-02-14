"use client";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import {
	useCategories,
	useProduct,
	useProductsByCategory,
	WooCommerce,
} from "@src/components/lib/woocommerce";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Loader = () => (
	<>
		{/* Add more loader divs if you want more placeholders */}
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
		<div className='sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
	</>
);

export const MainLoader = () => (
	<>
		<div className=' w-full h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0' />
	</>
);

const SortedProducts = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});

	useEffect(() => {
		// Fetch products for each filtered category
		const fetchCategoryProducts = async () => {
			try {
				// Set loading to true when starting the fetch
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);
							return { [category?.id]: response?.data }; // Return products mapped by category id
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with products mapped by category
					const productsMap = productsResults.reduce(
						(acc, result) => ({ ...acc, ...result }),
						{},
					);
					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				// Set loading to false when fetching is done
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	let TotalCategoryProductsMap: any;

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCategoryProductsMap - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	return (
		<div className='mb-8 lg:mb-16'>
			<div className=''>
				{
					isLoading && (
						<MainLoader />
					)
				}
				{categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5)
					?.map((category: CategoryType) => {
						const TotalCategoryProductsMap =
							categoryProductsMap[category?.id]?.length;
						return (
							<div
								key={category?.id}
								className='flex flex-col gap-5 sm:gap-16 justify-center mb-10 sm:mb-12'
							>
								<div className='w-full items-center flex justify-center'>
									<Link
										href={`${
											"/category/" +
											convertToSlug(category?.name) +
											"-" +
											category?.id
										}`}
										dangerouslySetInnerHTML={{ __html: category?.name }}
										className='text-xl sm:text-3xl font-medium tracking-tight text-black capitalize'
									/>
								</div>
								{/* Show loader when category products are loading */}
								<Carousel
									totalDataNumber={TotalCategoryProductsMap}
									maxScrollTotal={maxScrollTotal}
									scrollLeftTotal={scrollLeftTotal}
									handleNext={handleNext}
									handlePrev={handlePrev}
								>
									<div className='flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar max-w-[1256px]'>
										{isLoading ? (
											<Loader /> // Show loader when data is being fetched
										) : (
											<>
												{categoryProductsMap[category?.id]?.map(
													(product: ProductType) => (
														<ProductCard2
															key={product?.id}
															id={product?.id}
															image={product?.images[0]?.src}
															oldAmount={product?.regular_price}
															newAmount={product?.price}
															description={product?.name}
														/>
													),
												)}
											</>
										)}
									</div>
								</Carousel>

								<Link
									href={`${
										"/category/" +
										convertToSlug(category?.name) +
										"-" +
										category?.id
									}`}
									className='bg-primary font-semibold w-fit capitalize hover:bg-primaryColor-400 transition-[.3] hover:scale-105 text-white py-3 px-5 sm:px-7 rounded-md text-xs sm:text-base'
								>
									See all products
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SortedProducts;
