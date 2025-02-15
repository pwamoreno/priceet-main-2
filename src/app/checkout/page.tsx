import AppLayout from "@src/components/AppLayout";
import React from "react";
import CheckoutInfoForm from "./component/CheckoutInfoForm";

const Page = () => {
	return (
		<AppLayout>
			<div className='px-2 sm:px-6 mt-28 slg:mt-28 max-w-[1440px] mx-auto'>
				<section className='bg-white mt-3 w-full px-8 rounded-md border border-gray-300/40'>
					<h4 className='text-primaryColor-400 text-center sm:text-start capitalize text-base sm:text-2xl font-[500] leading-[1.5] py-2 sm:py-3'>
						Checkout
					</h4>
				</section>
				<CheckoutInfoForm />
			</div>
		</AppLayout>
	);
};

export default Page;
