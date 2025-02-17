// "use client";
// import React from "react";
// import * as Iconbi from "react-icons/bi";
// import { motion } from "framer-motion";
// import FooterCard from "../Cards/FooterCard";
// import { fivelinxMarts } from "@public/images";
import Image from "next/image";
// import Link from "next/link";
// import {
// 	AppStoreIconSvg,
// 	BuyNowPayLaterIconSvg,
// 	ChatServiceIconSvg,
// 	FileIconSvg,
// 	FivelinxMartIconSvg,
// 	GooglePlayIconSvg,
// 	RocketIconSvg,
// } from "../SvgIcons";

// import { Swiper, SwiperSlide } from "swiper/react";
// import useToken from "../hooks/useToken";
// import { signOut } from "@utils/lib";
// import { LogoImage } from "@utils/function";
// import { usePathname, useRouter } from "next/navigation";
// import { useCustomer } from "../lib/woocommerce";
// import { filterCustomersByEmail } from "@constants";

// interface footerDataProps {
// 	title: string;
// 	links: {
// 		label: string;
// 		href: string;
// 		function?: () => void;
// 	}[];
// }

// const Footer = () => {
// 	const { email } = useToken();
const currentYear = new Date().getFullYear();
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const { data: customer, isLoading, isError } = useCustomer("");
// 	const wc_customer2_info: Woo_Customer_Type[] = customer;
// 	const wc_customer_info: Woo_Customer_Type | undefined =
// 		filterCustomersByEmail(wc_customer2_info, email);
// 	const firstName = wc_customer_info?.first_name;

// 	const footer1socialMediaIcons = [
// 		{
// 			id: 1,
// 			icon: (
// 				<Iconbi.BiLogoFacebook className='text-lg sm:text-2xl text-white' />
// 			),
// 			link: "http://facebook.com/5linxmart/",
// 			backgroundColor: "bg-[#365493]",
// 		},

// 		{
// 			id: 3,
// 			icon: (
// 				<Iconbi.BiLogoLinkedin className='text-lg sm:text-2xl text-white' />
// 			),
// 			link: "http://instagram.com/trendhive/",
// 			backgroundColor: "bg-[#0274B3]",
// 		},
// 	];

// 	const handleClickAuth = () => {
// 		firstName ? signOut() : router.push("/user/login");
// 	};

// 	const staggerDelay = 0.2;

// 	return (
// 		<footer className='bg-gray-100/10 w-full p-2 sm:px-0 flex flex-col item-center'>
// 			<section className='sm:grid-cols-3 gap-4 sm:gap-8 lg:gap-16 mt-2 mx-auto max-w-[1400px] w-full grid py-4 lg:py-16'>
// 				<Link href='/' className='col-span-1'>
// 					<LogoImage className='w-[40px] sm:w-[80px] h-fit' />
// 				</Link>

// 				<div className='flex sm:items-center w-fit sm:mx-auto gap-6'>
// 					<Link
// 						href='/contact-us'
// 						className={`text-sm sm:text-base font-[400] leading-[1.3] hover:text-primary transition-[.3] ${
// 							pathname === "/contact-us"
// 								? "text-primary "
// 								: "text-secondary-500"
// 						}`}
// 					>
// 						Contact
// 					</Link>
// 					<Link
// 						href='/faq'
// 						className={`text-sm sm:text-base font-[400] leading-[1.3] hover:text-primary transition-[.3] ${
// 							pathname === "/faq" ? "text-primary " : "text-secondary-500"
// 						}`}
// 					>
// 						Faqs
// 					</Link>
// 					<div
// 						onClick={handleClickAuth}
// 						className='text-secondary-500 text-sm sm:text-base font-[400] leading-[1.3] hover:text-primary transition-[.3] cursor-pointer'
// 					>
// 						{firstName ? "Log Out" : "Login"}
// 					</div>
// 				</div>
// 				<div className='flex gap-1 sm:justify-end items-center'>
// 					{footer1socialMediaIcons.map((item, index) => (
// 						<motion.a
// 							href={item.link}
// 							key={index}
// 							className={`p-1 size-8 flex items-center justify-center rounded-full ${item.backgroundColor} transition-[.5] hover:!-translate-y-1 hover:scale-110`}
// 							initial={{ opacity: 0, scale: 1 }} // Initial position (opacity 0, y-axis offset 20px, and slightly smaller)
// 							animate={{ opacity: 1, scale: 0.8 }} // Target position (fully opaque, no offset, and original size)
// 							transition={{ delay: index * staggerDelay, duration: 0.5 }} // Stagger the animation delay based on index and set duration
// 						>
// 							{item.icon}
// 						</motion.a>
// 					))}
// 				</div>
// 			</section>

// 			<div className='flex items-center flex-col gap-2 lg:gap-0 lg:flex-row w-full justify-between sm:py-2 mx-auto max-w-[1156px] border-t border-primary/50'>
// 				<div className='flex items-center gap-6'>
// 					<Link
// 						href='/terms-of-use?terms-of-use'
// 						className='text-secondary-500 text-sm sm:text-base font-[400] leading-[1.3] hover:text-primary transition-[.3]'
// 					>
// 						Terms of Use
// 					</Link>
// 					<Link
// 						href='/terms-of-use?privacy-policy'
// 						className='text-secondary-500 text-sm sm:text-base font-[400] leading-[1.3] hover:text-primary transition-[.3]'
// 					>
// 						Privacy Policy
// 					</Link>
// 				</div>
// 				<div className='text-secondary-500 text-xs slg:text-sm font-[400] leading-[1.2]'>
// 					Copyright&nbsp;@ {currentYear}&nbsp;Priceet Alright Reserved.
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-6">

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between mt-10">
          {/* Brand & Description */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center space-x-2">
              <Image className="text-2xl" alt="Priceet-logo" src="./images/logo-image.png" width={40} height={40}/>
            </div>
            <p className="text-gray-600 mt-4">
              Brand designs and clothing for the young, the old & everyone
              in between – but most importantly, for the fashionable.
            </p>
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaTwitter className="text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaLinkedinIn className="text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaInstagram className="text-gray-600 hover:text-gray-900 cursor-pointer" />
              <FaYoutube className="text-gray-600 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>

          {/* Shopping Online */}
          <div className="w-full md:w-1/6">
            <h3 className="font-semibold text-gray-800">Shopping Online</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Order Status</li>
              <li>Shipping and Delivery</li>
              <li>Returns</li>
              <li>Payment options</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Information */}
          <div className="w-full md:w-1/6">
            <h3 className="font-semibold text-gray-800">Information</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Gift Cards</li>
              <li>Find a store</li>
              <li>Newsletter</li>
              <li>Become a member</li>
              <li>Site feedback</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full md:w-1/6">
            <h3 className="font-semibold text-gray-800">Contact</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>priceet@store.com</li>
              <li>Hotline: +234 810 654 3219</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-sm mt-10">
          Copyright&nbsp;@ {currentYear}&nbsp;Priceet Alright Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
