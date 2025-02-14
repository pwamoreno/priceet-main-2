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
import { Popover, Transition } from "@headlessui/react";
import { useCategories, useCustomer } from "../lib/woocommerce";
import { convertToSlug, filterCustomersByEmail } from "@constants";
import { ImSpinner2 } from "react-icons/im";
import { LogoImage } from "@utils/function";
import SearchInput from "../Reusables/SearchInput";
import Drawer from "react-modern-drawer";
import { GrClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

	const [drawerSize, setDrawerSize] = useState<number | string>(400); // Default size

	useEffect(() => {
		// Function to update the drawer size based on screen width
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setDrawerSize("100%"); // Smaller width for mobile
			} else {
				setDrawerSize(400); // Default width for larger screens
			}
		};

		// Initial check
		handleResize();

		// Add resize event listener
		window.addEventListener("resize", handleResize);

		// Clean up event listener on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;

	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

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
		<>
			<header
				className={`flex slg:flex-col w-full justify-center items-center bg-white z-50 transition drop-shadow-md fixed top-0 lg:max-h-[80px] ${
					navbar ? "" : ""
				}`}
			>
				{/* Desktop */}
				<div className='hidden slg:grid grid-cols-4 items-center w-full py-4 max-w-[1400px] z-30 px-5 xl:px-0'>
					<div className='flex items-center gap-12'>
						<Link href='/' className='col-span-1'>
							<LogoImage className='w-[80px] h-fit' />
						</Link>
						<div className='flex items-center gap-2.5'>
							<span>Pages</span>
							<div
								className='p-2 hover:bg-primary/20 rounded-full cursor-pointer hover:scale-110 transition-[.4]'
								onClick={toggleDrawer}
							>
								<GiHamburgerMenu className='text-sm cursor-pointer' />
							</div>
						</div>
					</div>
					<div className='flex h-10 col-span-2'>
						<SearchInput
							className='flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.8rem] bg-gray-100/30 !rounded-full outline-none focus:border-primaryColor-100 focus:ring-1 transition'
							placeholder='Search for products'
							searchValue={searchValue}
							setSearchQuery={setSearchValue}
							onSearch={handleSearch}
							isLoading={false}
						/>
					</div>
					<div className='flex justify-end gap-1 xl:gap-2 col-span-1'>
						<div
							className='flex gap-2 justify-center items-center cursor-pointer'
							onClick={() => router.push("/cart")}
						>
							{typeof window !== "undefined" && (
								<div className='flex relative justify-center items-center rounded-full size-9 p-2 text-sm border'>
									<span className='absolute -top-1 -right-1 size-4 bg-primary text-white text-xs shadow-lg flex justify-center items-center rounded-full'>
										{totalItems}
									</span>
									<CartIconSvg className='fill-primary size-5' />
								</div>
							)}
							<span
								className='truncate text-sm font-semibold w-16 overflow-hidden'
								title={`₦${calculateSubtotal().toString()}`}
							>
								{FormatMoney2(calculateSubtotal())}
							</span>
						</div>
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
								<UserIconSvg className='size-5 fill-primary' />
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
													className='flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute right-0 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light'
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
					</div>
				</div>

				{/* Mobile */}
				<div className='flex flex-col items-center w-full slg:hidden px-2 xs:px-4 py-4'>
					<div className='flex items-center w-full justify-between'>
						<div className='flex items-center gap-1'>
							<GiHamburgerMenu
								onClick={toggleDrawer}
								className='text-3xl text-primary hover:scale-105 transition-[.5]'
							/>
							<Link href='/' className='col-span-1'>
								<LogoImage className='w-[60px] h-fit' />
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

							<div
								className='flex gap-2 justify-center items-center cursor-pointer'
								onClick={() => router.push("/cart")}
							>
								{typeof window !== "undefined" && (
									<div className='flex relative justify-center items-center rounded-full size-9 p-2 text-sm border'>
										<span className='absolute -top-1 -right-1 size-4 bg-primary text-white text-xs shadow-lg flex justify-center items-center rounded-full'>
											{totalItems}
										</span>
										<CartIconSvg className='fill-primary size-5' />
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
					<div className='flex w-full h-10 mt-2 px-1'>
						<SearchInput
							className='flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.8rem] bg-gray-100/30 !rounded-full outline-none focus:border-primaryColor-100 focus:ring-1 transition'
							placeholder='Search for products'
							searchValue={searchValue}
							setSearchQuery={setSearchValue}
							onSearch={handleSearch}
							isLoading={false}
						/>
					</div>
				</div>
			</header>

			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction='left'
				size={drawerSize}
				className='px-5'
			>
				<div className='mt-4 flex w-full justify-between items-center'>
					<Link href='/' className=''>
						<LogoImage className='w-[60px] lg:w-[80px] h-fit' />
					</Link>

					<GrClose
						className='text-2xl text-black cursor-pointer hover:scale-95 transition-[.3]'
						onClick={toggleDrawer}
					/>
				</div>
				<div className='space-y-2 mt-5 lg:mt-10 w-fit'>
					<Link
						href={"/"}
						className={`relative w-fit group py-2 group transition hover:bg-primary-600 text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
							pathname === "/" && "text-primary"
						}`}
					>
						Home
						<span
							className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-primary transition-transform duration-500 ${
								pathname === "/" ? "scale-x-100" : "scale-x-0"
							} transform origin-bottom-left group-hover:scale-x-100`}
						/>
					</Link>
					<Link
						href={"/contact-us"}
						className={`relative w-fit group py-2 group transition hover:bg-primary-600 text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
							pathname === "/contact-us" && "text-primary"
						}`}
					>
						Contact
						<span
							className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-primary transition-transform duration-500 ${
								pathname === "/contact-us" ? "scale-x-100" : "scale-x-0"
							} transform origin-bottom-left group-hover:scale-x-100`}
						/>
					</Link>

					<Popover className='block relative w-fit'>
						{({ open }) => (
							<>
								<Popover.Button
									className={`flex w-fit items-center justify-between gap-2.5 hover:bg-primary-600 group py-2 lg:pt-3 group transition ${
										open && "border-b-[3px] border-primary"
									}`}
								>
									<h2 className='text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1'>
										Category
									</h2>

									{open ? (
										<IoIosArrowUp
											className={`text-lg group-hover:text-primary-100 ${
												open ? "text-primary-100" : "text-black-600"
											}`}
										/>
									) : (
										<IoIosArrowDown
											className={`text-lg group-hover:text-primary-100 ${
												open ? "text-primary-100" : "text-black-600"
											}`}
										/>
									)}
								</Popover.Button>
								<Transition
									as={React.Fragment}
									enter='transition ease-out duration-100'
									enterFrom='opacity-0 -translate-x-1'
									enterTo='opacity-100 translate-x-0'
									leave='transition ease-in duration-150'
									leaveFrom='opacity-100 translate-x-0'
									leaveTo='opacity-0 -translate-x-1'
								>
									<Popover.Panel className='pl-4 space-y-4 mx-auto py-3 rounded-md transition'>
										<Link
											href='/category'
											className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
												pathname === `/category`
													? "text-primary-100"
													: "text-black-600"
											} hover:text-primaryColor-400 transition`}
										>
											<h4
												className={`cursor-pointer group-hover:text-primary-100 font-medium transition`}
												dangerouslySetInnerHTML={{ __html: "All" }}
											/>
										</Link>
										{Categories &&
											Categories?.filter(
												(item) => item?.name?.toLowerCase() !== "uncategorized",
											).map((item) => {
												return (
													<Link
														key={item?.id}
														href={`${
															"/category/" +
															convertToSlug(item?.name) +
															"-" +
															item?.id
														}`}
														className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
															pathname ===
															`${
																"/category/" +
																convertToSlug(item?.name) +
																"-" +
																item?.id
															}`
																? "text-primary-100"
																: "text-black-600"
														} hover:text-primaryColor-400 transition`}
													>
														<h4
															className={`cursor-pointer group-hover:text-primary-100 font-medium transition`}
															dangerouslySetInnerHTML={{ __html: item?.name }}
														/>
													</Link>
												);
											})}
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>

					<Link
						href={"/faq"}
						className={`relative w-fit group py-2 group transition hover:bg-primary-600 text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
							pathname === "/faq" && "text-primary"
						}`}
					>
						Faqs
						<span
							className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-primary transition-transform duration-500 ${
								pathname === "/faq" ? "scale-x-100" : "scale-x-0"
							} transform origin-bottom-left group-hover:scale-x-100`}
						/>
					</Link>
				</div>
			</Drawer>
		</>
	);
};

export default Header;
