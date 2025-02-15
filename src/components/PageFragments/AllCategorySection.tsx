"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import { Slide } from "react-slideshow-image";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import Button from "../Reusables/Buttons/Button";
import { electronicsBanner } from "@public/images";

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
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

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage, // Store the first product's image
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				// console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
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
		<>
			
			<div className='sm:h-fit flex flex-col-reverse sm:flex-row gap-2 w-full bg-background/50 pb-2 sm:p-4 rounded-md sm:mt-28 md:mt-20 lg:mt-16'>
				<div className='lg:w-[400px] grid place-items-center'>
					<div className='flex flex-col items-center'>
						<h4 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-500 capitalize'>
							🎉 Unbeatable Savings 🎉
						</h4>

						<h4 className='text-base sm:text-2xl md:text-3xl text-center font-bold capitalize line-clamp-2 max-w-[300px] mt-2 sm:mt-5 mb-4 sm:mb-8'>
							Don&rsquo;t miss out on the best deals!
						</h4>

						<Link
							href='/category'
							className='text-sm sm:text-lg md:text-xl bg-primary w-fit hover:bg-primaryColor-400 transition-[.3] hover:scale-105 text-white py-2 sm:py-3 px-4 sm:px-7 rounded-md font-semibold'
						>
							Shop Now
						</Link>
					</div>
				</div>

				<Picture
					src={electronicsBanner}
					alt={"electronics-banner"}
					className='sm:w-[300px] flex-1 lg:w-full object-contain h-fit lg:h-[300px] bg-custom-gradient sm:rounded-md transition-[.4]'
				/>
			</div>
		</>
	);
};

export default AllCategorySection;
