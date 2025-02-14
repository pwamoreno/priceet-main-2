import React from "react";
import ProductCard2 from "../Cards/ProductCard2";
import { ScaleLoader } from "react-spinners";

interface SearchDataOutputProps {
	data: ProductType[];
	isloading: boolean;
}

const SearchDataOutput = ({ data, isloading }: SearchDataOutputProps) => {
	// SwiperCore.Navigation;
	const productCards = data?.map((product) => (
		<ProductCard2
			key={product?.id}
			boxShadow
			id={product?.id}
			image={product?.images[0]?.src}
			oldAmount={product?.regular_price}
			newAmount={product?.price}
			description={product?.name}
		/>
	));

	return (
		<div className='grid grid-cols-2 sm:flex flex-wrap w-full gap-2 xs:gap-3 sm:gap-4 slg:gap-8 py-12'>
			{productCards}
		</div>
	);
};

export default SearchDataOutput;
