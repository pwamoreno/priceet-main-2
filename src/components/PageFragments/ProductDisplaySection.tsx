"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import Picture from "../picture/Picture";
import SocialMediaShare from "../common/SocialMediaShare";
import { useProduct } from "../lib/woocommerce";
import RelatedProductsSection from "./RelatedProductsSection";
import CurrencyFormat from "react-currency-format";

interface ProductDisplaySectionProps {
	FormatedId?: string;
}

const ProductDisplaySection = ({ FormatedId }: ProductDisplaySectionProps) => {
	// Woo commerce API Product
	const {
		data: product,
		isLoading: productWpIsLoading,
		isError: productIsError,
	} = useProduct(FormatedId);

	const Product: ProductType = product;

	// console.log("Product", Product);
	const pathname = usePathname();
	const router = useRouter();
	const [count, setCount] = useState(0);
	const [mainProductImage, setMainProductImage] = useState("");
	const [baseUrl, setBaseUrl] = useState("");
	const currentYear = new Date().getFullYear();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setBaseUrl(`${window.location.protocol}//${window.location.host}`);
		}
	}, []);
	const capitalizeFirstLetter = (word: string | null) => {
		if (word) {
			// Decode the URL-encoded characters
			const decodedWord = decodeURIComponent(word);

			// Capitalize the first letter and convert the rest to lowercase
			return decodedWord.charAt(0) + decodedWord.slice(1);
		}
		return "";
	};

	const { addItem, removeItem, updateItem, getItem } = useCart();

	let Idn = "0";
	let Price = 0;

	if (Product) {
		Idn = Product?.id.toString();
		Price = parseInt(Product?.price);
	}

	const cartItem = getItem(Idn);
	const cartItemCount = cartItem ? cartItem.quantity : 0;
	const handleMinusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = Math.max(count - 1, 0);

		if (newCount === 0) {
			// If count becomes 0, remove the item from the cart
			removeItem(Idn);
		} else {
			// Update the cart item with the new quantity
			updateItem(Idn, {
				quantity: newCount,
			});
		}

		setCount(newCount);
	};

	const handlePlusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = count + 1;

		addItem({
			id: Idn,
			name: Product?.name,
			price: Price,
			quantity: newCount,
			image: Product?.images[0]?.src,
		});

		setCount(newCount);
	};

	const handleClick = (e: React.MouseEvent) => {
		router.push("/cart");
	};

	// useEffect(() => {
	// 	setMainProductImage(data?.image[0]);
	// }, []);

	return (
		<>
			<section className='slg:px-5 xl:px-0 mt-3 sm:mt-5'>
				{Product && (
					<>
						<div className='bg-white flex flex-col-reverse slg:flex-row w-full slg:py-5'>
							<div className='flex items-center flex-col justify-center w-full sm:w-fit flex-1'>
								<Picture
									src={Product?.images[0]?.src || ""}
									alt={Product?.name}
									className='w-full p-2 object-contain'
								/>
							</div>

							<div className='flex flex-1 flex-col w-full mt-6 slg:px-10 lg:px-20'>
								<div className='flex justify-between'>
									<div className='flex justify-center gap-4 slg:gap-6 flex-col'>
										<h4
											title={Product?.name}
											className='text-lg sm:text-3xl font-semibold leading-[1.2] line-clamp-3'
										>
											{Product?.name}
										</h4>
										<div className='flex items-center'>
											<button
												className={`${
													Product?.stock_status === "instock"
														? "bg-green-100"
														: Product?.stock_status === "outofstock"
														? "bg-red-500"
														: "bg-black"
												}  text-white px-2 py-1 text-xs rounded-3xl`}
											>
												{Product?.stock_status === "instock"
													? "In Stock"
													: Product?.stock_status === "outofstock"
													? "Out of Stock"
													: Product?.stock_status === "onbackorder"
													? "On Back Order"
													: ""}
											</button>
										</div>
									</div>
								</div>

								<div className={`flex flex-col sm:mt-3`}>
									<div className='flex gap-4 sm:gap-6 justify-start items-center py-5 slg:py-3'>
										<h3 className='text-2xl slg:text-3xl font-semibold leading-[.95] text-primary'>
											{FormatMoney2(Price)}
										</h3>

										<h4 className='text-sm text-[#00000071] font-[400] line-through leading-[1.8]'>
											{FormatMoney2(parseInt(Product?.regular_price))}
										</h4>
									</div>

									<div className='flex slg:py-3 items-center justify-between slg:justify-startpb-5 mb-4'>
										<div className='flex'>
											<div
												onClick={handleMinusCartClick}
												className='py-[5px] slg:py-2 px-3 slg:px-4 flex items-center justify-center border border-r-0 border-black/50 rounded-l-3xl cursor-pointer hover:bg-primary hover:border-primary hover:text-white transition'
											>
												<AiOutlineMinus className='text-xs slg:text-base' />
											</div>
											<span className='py-[5px] slg:py-2 px-3 slg:px-4 border-[1px] border-r-0 border-black/50 text-center overflow-hidden shrink-0 w-[40px]'>
												{cartItemCount}
											</span>
											<div
												className='py-[5px] slg:py-2 px-3 slg:px-4 flex items-center justify-center border-[1px] rounded-r-3xl cursor-pointer hover:bg-primary hover:border-primary hover:text-white border-black/50 transition'
												onClick={handlePlusCartClick}
											>
												<AiOutlinePlus className='text-xs slg:text-base' />
											</div>
										</div>
									</div>

									<div className='flex flex-col gap-3 sm:gap-8 pb-5'>
										{cartItemCount > 0 && (
											<button
												disabled={cartItemCount === 0}
												onClick={handleClick}
												className={`${
													cartItemCount === 0
														? "bg-primaryColor-300/80 cursor-not-allowed"
														: "bg-primaryColor-300 hover:bg-primary cursor-pointer"
												} px-4 slg:px-8 py-3 flex items-center justify-center gap-1 rounded-lg leading-[1.5] transition w-fit`}
											>
												<h4 className='text-white capitalize font-semibold text-sm slg:text-base'>
													Buy Now
												</h4>
											</button>
										)}
										<div className='flex gap-2 flex-col sm:flex-row sm:items-center'>
											<span className='font-outfit text-sm lg:text-base text-primary font-semibold text-primary-100'>
												Share:
											</span>
											<div className='flex flex-wrap items-center gap-3 w-full'>
												<SocialMediaShare
													APP_ID={""}
													mediaDescription={Product?.name}
													picture_url={Product?.images[0]?.src}
													shareUrl={`${baseUrl}${pathname}`}
													title={Product?.name}
													key={0}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='bg-white mt-4 w-full px-2 slg:px-0'>
							<div className='slg:ml-8 pb-3 pt-5 slg:pr-2 w-fit border border-primary border-t-0 border-r-0 border-l-0'>
								<h4 className='text-secondary-200 uppercase text-xs sm:text-sm font-semibold leading-[1.5]'>
									Description
								</h4>
							</div>
						</div>
						<div className='bg-white mt-[1px] w-full pt-2 pb-5 px-2 slg:px-8 min-h-[200px]'>
							<span
								dangerouslySetInnerHTML={{ __html: Product?.description }}
								className='text-secondary-200 text-xs sm:text-sm font-[400] leading-[1.5]'
							/>
						</div>
					</>
				)}
				{Product && (
					<RelatedProductsSection
						productCategoryId={Product?.categories[0]?.id.toString()}
					/>
				)}
			</section>
		</>
	);
};

export default ProductDisplaySection;
