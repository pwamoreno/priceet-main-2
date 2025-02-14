"use client";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import {
	useCategories,
	useProduct,
	useProductsByCategory,
	WooCommerce,
} from "@src/components/lib/woocommerce";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const Loader = () => (
	<div className='flex gap-2 w-full items-center'>
		{/* Add more loader divs if you want more placeholders */}
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
	</div>
);

const SortedProducts = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();
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

	const TotalCategoryProductsMap: any = categoryProductsMap?.length;

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

	const handleCategoryClick = (name: string, id: number) => {
		const categorySlugId = `${convertToSlug(name) + "-" + id}`;
		dispatch(updateCategorySlugId({ categorySlugId }));
		router.push(`/category/${convertToSlug(name) + "-" + id}`);
	};

	return (
		<div className='mb-8 lg:mb-16'>
			<div className='space-y-5 md:space-y-10'>
				{categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5)
					?.map((category: CategoryType) => (
						<div key={category?.id} className='space-y-4'>
							<div className='w-full items-center flex justify-between sm:px-2'>
								<Link
									href='/category/id'
									// href={`${
									// 	"/category/" +
									// 	convertToSlug(category?.name) +
									// 	"-" +
									// 	category?.id
									// 	}`}
									onClick={() =>
										handleCategoryClick(category?.name, category?.id)
									}
									dangerouslySetInnerHTML={{
										__html: category?.name,
									}}
									className='text-lg sm:text-xl md:text-2xl w-4/5 font-medium tracking-tight text-black line-clamp-2'
								/>
								<Link
									// href={`${
									// 	"/category/" +
									// 	convertToSlug(category?.name) +
									// 	"-" +
									// 	category?.id
									// 	}`}

									href='/category/id'
									// href={`${
									// 	"/category/" +
									// 	convertToSlug(category?.name) +
									// 	"-" +
									// 	category?.id
									// 	}`}
									onClick={() =>
										handleCategoryClick(category?.name, category?.id)
									}
									className='text-sm font-medium tracking-tight text-black hover:text-primary transition hover:underline underline-offset-4'
								>
									See all
								</Link>
							</div>
							{/* Show loader when category products are loading */}
							<Carousel
								totalDataNumber={TotalCategoryProductsMap}
								maxScrollTotal={maxScrollTotal}
								scrollLeftTotal={scrollLeftTotal}
								handleNext={handleNext}
								handlePrev={handlePrev}
							>
								<div className='flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar'>
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
						</div>
					))}
			</div>
		</div>
	);
};

export default SortedProducts;
