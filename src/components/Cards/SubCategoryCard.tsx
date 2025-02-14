"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";

interface SubCategoryCardProps {
	id?: string;
	image?: string;
	name: string;
}
const SubCategoryCard = ({ id, image, name }: SubCategoryCardProps) => {
	const { data } = useSelector((state: RootState) => state.subCategoryId);

	return (
		<Link
			href={`${"/category/" + convertToSlug(name) + "-" + id}`}
			className={`flex flex-col gap-2 items-center group w-fit cursor-pointer rounded-sm bg-white border-[2px] border-transparent hover:border-primary/50 transition shrink-0 ${
				data === id ? "border-[2px]" : ""
			}`}
		>
			<div className='flex px-8 pt-2'>
				<Picture
					src={image || "/images/home-img-1.png"}
					alt={`category-img-${name}`}
					className='w-[600px] h-[200px] object-cover object-center bg-[#111111] group-hover:scale-105 transition-[.4]'
				/>
			</div>

			<h4
				dangerouslySetInnerHTML={{ __html: name }}
				className='text-primaryColor-100 font-semibold leading-[1.5rem] pb-2 text-center'
			/>
		</Link>
	);
};

export default SubCategoryCard;
