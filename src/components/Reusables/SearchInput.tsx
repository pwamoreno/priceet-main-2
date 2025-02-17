"use client"

import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps {
	placeholder?: string;
	className?: string;
	searchValue?: string;
	setSearchQuery: (query: string) => void;
	isLoading?: boolean;
	onSearch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = "Search...",
	className = "",
	searchValue: externalSearchValue,
	setSearchQuery,
	isLoading = false,
	onSearch,
}) => {
	const [internalSearchValue, setInternalSearchValue] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);

	const currentSearchValue = externalSearchValue ?? internalSearchValue;

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (externalSearchValue !== undefined) {
			setSearchQuery(newValue);
		} else {
			setInternalSearchValue(newValue);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && onSearch) {
			onSearch();
		}
	};

	const toggleSearch = () => {
		setIsExpanded((prev) => !prev);
	};

	const handleBlur = () => {
		if (!currentSearchValue) {
			setIsExpanded(false);
		}
	};

	return (
		<div className={`relative flex items-center ${className}`}>
			{/* Search Bar */}
			<div
				className={`flex items-center border bg-gray-200 transition-all duration-300 ${
					isExpanded ? "w-96 px-4 py-2 rounded-full" : "w-10 h-10 p-2 rounded-full bg-transparent"
				}`}
			>
				{isExpanded && (
					<input
						type='text'
						autoFocus
						placeholder={placeholder}
						className='flex-1 bg-transparent outline-none text-base text-black/70 pl-4 pr-2 h-[2rem] w-full !rounded-full transition'
						// className='flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.8rem] bg-gray-100/30 !rounded-full outline-none focus:border-primaryColor-100 focus:ring-1 transition'
						value={currentSearchValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onBlur={handleBlur}
					/>
				)}

				{/* Search Icon */}
				<button
					type='button'
					className='transition ml-auto'
					onClick={toggleSearch}
				>
					{isLoading ? <ImSpinner2 className='animate-spin' /> : <IoSearchOutline color="#427695" className="size-5" />}
				</button>
			</div>
		</div>
	);
};

export default SearchInput;
