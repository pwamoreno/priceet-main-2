"use client";
import React, { useEffect, useState } from "react";
import { CartIconSvg, FivelinxMartIconSvg, UserIconSvg } from "../SvgIcons";
import { usePathname, useRouter } from "next/navigation";
import HomePageBottomHeader from "./HomePageBottomHeader";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./MobileNav";
import useToken from "../hooks/useToken";
import * as bi from "react-icons/bi";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";

import {
	useGetProductQuery,
	useGetUserAccountQuery,
} from "../config/features/api";
import { useDispatch } from "react-redux";
import { setSearchDataState } from "../config/features/searchDataState";
import { getFirstCharacter, signOut } from "@utils/lib";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { stringify } from "querystring";
import { SlArrowDown } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { BsTags } from "react-icons/bs";
import { setUserDetails } from "../config/features/userDetails";
import Picture from "../picture/Picture";
import { useAppSelector } from "../hooks";
import { useCustomer } from "../lib/woocommerce";
import { filterCustomersByEmail } from "@constants";
import { ImSpinner2 } from "react-icons/im";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { totalItems, items } = useCart();
	const isUserPathname = pathname.includes("user");
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [isMobileNav, setIsMobileNav] = useState(false);
	const [isUserClick, setIsUserClick] = useState(false);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const { token, email } = useToken();
	const [searchValue, setSearchValue] = useState("");
	// const { token } = useAppSelector((ele) => ele?.auth);
	const dispatch = useDispatch();

	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);

	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item?.price * item.quantity,
			0,
		);
	};

	const mobileDropDownLinks = [
		{
			id: 1,
			href: "/user/dashboard",
			icon: <bi.BiUser className='text-base' />,
			label: "My Account",
		},
		{
			id: 2,
			href: "/user/my-orders",
			icon: <FaCartArrowDown className='text-base' />,
			label: "Orders",
		},

		{
			id: 3,
			href: "/cart",
			icon: <FiShoppingCart className='text-base' />,
			label: "Cart",
		},
	];

	const handleisMobileNavClick = () => {
		setIsUserClick(!isUserClick);
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSearch = () => {
		setIsSearchLoading(true);
		if (pathname === "/search") {
			setIsSearchLoading(false);
			router.push(`/search?${searchValue}`);
		} else {
			router.push(`/search?${searchValue}`);
		}
	};

	// useEffect(() => {
	// 	dispatch(setUserDetails({ data: userAccount }));
	// }, [userAccount]);

	const firstName = wc_customer_info?.first_name;
	const lastName = wc_customer_info?.last_name;
	const openDrawer = () => {
		setDrawerVisible(true);
	};

	const closeDrawer = () => {
		setDrawerVisible(false);
	};

	const handleNavMenuClick = () => {
		setIsMobileNav(!isMobileNav);
		openDrawer();
	};

	const [navbar, setNavbar] = useState(false);

	const setFixedHandler = () => {
		if (typeof window !== "undefined") {
			window.scrollY >= 200 ? setNavbar(true) : setNavbar(false);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", setFixedHandler);

			return () => {
				window.removeEventListener("scroll", setFixedHandler);
			};
		}
	}, []);
	return (
		<header
			className={`flex slg:flex-col w-full justify-center items-center bg-white z-50 transition drop-shadow-md fixed top-0 ${
				navbar ? "" : ""
			}`}
		>
			{/* Desktop */}
			<div className='hidden slg:grid grid-cols-4 items-center w-full py-1 max-w-[1200px] z-30 px-5 xl:px-0'>
				<Link href='/' className='col-span-1'>
					<FivelinxMartIconSvg className='w-[200px] h-fit' />
				</Link>
				<div className='flex h-10 col-span-2'>
					<input
						type='text'
						placeholder="I'm looking for..."
						className='flex-1 text-base text-black/70 px-4 py-1 border border-[#ccc] rounded-l-sm outline-none focus:border-primaryColor-100 focus:ring-primaryColor-100 focus:ring-1 transition'
						value={searchValue}
						onChange={handleInputChange}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSearch();
							}
						}}
					/>

					{isSearchLoading ? (
						<button
							type='button'
							className='px-6 text-primary te font-semibold transition-[.5] rounded-r-sm hover:text-primaryColor-200 focus:outline-none focus:ring focus:border-blue-300 text-xl'
						>
							<ImSpinner2 className='animate-spin' />
						</button>
					) : (
						<button
							type='submit'
							className='px-6 text-primary te font-semibold transition-[.5] rounded-r-sm hover:text-primaryColor-200 focus:outline-none focus:ring focus:border-blue-300 text-xl'
							onClick={handleSearch}
						>
							<FaSearch />
						</button>
					)}
				</div>
				<div className='flex justify-end gap-4 xl:gap-8 col-span-1'>
					<div className='flex gap-2 justify-center items-center'>
						{wc_customer_info?.shipping?.address_2 ? (
							<Picture
								src={wc_customer_info?.shipping?.address_2}
								alt={"user-image"}
								loading='eager'
								className='size-10 rounded-full object-contain'
							/>
						) : firstName ? (
							<div className='flex justify-center items-center w-12 h-12'>
								<span className='flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-white text-xl font-semibold'>
									{getFirstCharacter(firstName)}
								</span>
							</div>
						) : (
							<UserIconSvg className='w-8 h-8' />
						)}

						<div className='flex flex-col text-primary font-semibold text-sm'>
							{firstName ? (
								<div
									className='flex gap-1.5 items-center cursor-pointer group relative'
									// onClick={() => router.push("/user/dashboard")}
									onClick={handleisMobileNavClick}
								>
									<span
										title={firstName}
										className='line-clamp-1 overflow-y-hidden w-12'
									>
										{firstName}
									</span>
									<SlArrowDown className='text-primary group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out' />
									<AnimatePresence>
										{isUserClick && (
											<motion.nav
												initial={{ y: -100, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={{ y: -100, opacity: 0 }}
												className='flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute left-0 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light'
											>
												{mobileDropDownLinks.map((item, i) => (
													<Link
														key={i}
														href={item.href}
														className={`${
															pathname === item.href
																? "text-primary"
																: "text-black"
														} flex gap-1.5 px-4 items-center hover:text-primary`}
													>
														{item.icon}
														{item.label}
													</Link>
												))}
												<span
													onClick={() => signOut()}
													className='text-center pt-1 pb-2 text-gray-500 hover:text-primary border-t'
												>
													Log Out
												</span>
											</motion.nav>
										)}
									</AnimatePresence>
								</div>
							) : (
								<div className='flex flex-col'>
									<span
										className='cursor-pointer hover:text-primaryColor-200 transition'
										onClick={() => router.push("/user/login")}
									>
										Log In
									</span>
									{/* <span
										className='cursor-pointer hover:text-primaryColor-200 transition'
										onClick={() => router.push("/user/register")}
									>
										Register
									</span> */}
								</div>
							)}
						</div>
					</div>

					<div
						className='flex gap-2 justify-center items-center cursor-pointer'
						onClick={() => router.push("/cart")}
					>
						{typeof window !== "undefined" && (
							<div className='flex relative justify-center items-center rounded-full w-12 h-12 p-2 text-sm border'>
								<span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white shadow-lg flex justify-center items-center rounded-full'>
									{totalItems}
								</span>
								<CartIconSvg />
							</div>
						)}
						<span
							className='truncate text-sm font-semibold w-16 overflow-hidden'
							title={`₦${calculateSubtotal().toString()}`}
						>
							{FormatMoney2(calculateSubtotal())}
						</span>
					</div>
				</div>
			</div>

			{/* Mobile */}
			<div className='flex flex-col items-center w-full slg:hidden px-2 xs:px-4 py-4'>
				<div className='flex items-center w-full justify-between'>
					<div className='flex items-center gap-1'>
						<GiHamburgerMenu
							onClick={handleNavMenuClick}
							className='text-3xl text-primary hover:scale-105 transition-[.5]'
						/>
						<Link href='/'>
							<FivelinxMartIconSvg className='w-[120px] h-fit' />
						</Link>
					</div>

					<div className='flex gap-4 justify-center items-center cursor-pointer'>
						{firstName ? (
							<div
								className='flex gap-1.5 items-center h-full cursor-pointer group relative'
								onClick={handleisMobileNavClick}
							>
								{wc_customer_info?.shipping?.address_2 ? (
									<Picture
										src={wc_customer_info?.shipping?.address_2}
										alt={"user-image"}
										loading='eager'
										className='w-8 h-8 rounded-full object-contain'
									/>
								) : (
									<span className='flex justify-center items-center w-8 h-8 p-4 rounded-full bg-gray-300 text-white text-xl font-semibold'>
										{getFirstCharacter(firstName)}
									</span>
								)}

								<SlArrowDown className='text-primary text-sm group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out' />
								<AnimatePresence>
									{isUserClick && (
										<motion.nav
											initial={{ y: -100, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: -100, opacity: 0 }}
											className='flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute -left-12 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light'
										>
											{mobileDropDownLinks.map((item, i) => (
												<div
													key={i}
													className='flex gap-2 px-4 items-center text-xs'
												>
													{item.icon}
													<Link
														href={item.href}
														className={`${
															pathname === item.href
																? "text-primary"
																: "text-black"
														} hover:text-primary`}
													>
														{item.label}
													</Link>
												</div>
											))}
											<span
												onClick={() => signOut()}
												className='text-center text-xs pt-1 pb-2 text-gray-500 hover:text-primary border-t'
											>
												Log Out
											</span>
										</motion.nav>
									)}
								</AnimatePresence>
							</div>
						) : (
							<UserIconSvg
								onClick={() => router.push("/user/login")}
								className='w-6 h-6'
							/>
						)}

						{typeof window !== "undefined" && (
							<div
								onClick={() => router.push("/cart")}
								className='flex relative justify-center items-center rounded-full w-10 h-10 p-2 text-xs border'
							>
								<span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white shadow-lg flex justify-center items-center rounded-full'>
									{totalItems}
								</span>
								<CartIconSvg />
							</div>
						)}
					</div>
				</div>
				<div className='flex w-full h-10 mt-5 px-1'>
					<input
						type='text'
						placeholder="I'm looking for..."
						className='w-full text-base text-black/70 px-4 py-1 border border-[#ccc] rounded-l-sm outline-none focus:border-primaryColor-100 focus:ring-primaryColor-100 focus:ring-1 transition'
						value={searchValue}
						onChange={handleInputChange}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSearch();
							}
						}}
					/>

					{isSearchLoading ? (
						<button
							type='button'
							className='bg-primary text-white font-semibold transition-[.5] rounded-r-sm hover:bg-primaryColor-200 focus:outline-none focus:ring focus:border-blue-300 text-sm px-3'
						>
							<ImSpinner2 className='animate-spin' />
						</button>
					) : (
						<button
							type='submit'
							className='bg-primary text-white font-semibold transition-[.5] rounded-r-sm hover:bg-primaryColor-200 focus:outline-none focus:ring focus:border-blue-300 text-sm px-3'
							onClick={handleSearch}
						>
							<FaSearch />
						</button>
					)}
				</div>
				{drawerVisible && (
					<MobileNav closeDrawer={closeDrawer} drawerVisible={drawerVisible} />
				)}
			</div>
			{pathname.includes("/category") ? (
				<CategoryPageBottomHeader />
			) : pathname.includes("/home-item") ? (
				<ProductPageBottomHeader />
			) : (
				<HomePageBottomHeader />
			)}
		</header>
	);
};

export default Header;
