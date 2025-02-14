"use client";
import { userSidebar } from "@constants";
import {
	FiCheck,
	FiRefreshCcw,
	FiRefreshCw,
	FiShoppingCart,
	FiTruck,
} from "react-icons/fi";
import DashboardCard from "@src/components/Cards/DashboardCard";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import RecentOrder from "@src/components/RecentOrder";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIconSvg, RejectedIconSvg } from "./SvgIcons";
import { BiLogOut, BiTag } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { signOut } from "@utils/lib";
import { useGetUserOrdersQuery } from "./config/features/api";
import useToken from "./hooks/useToken";
import { useOrders } from "./lib/woocommerce";

export interface dashboardCardDataProps {
	id: number;
	title: string;
	Icon: IconType;
	quantity?: number;
	className: string;
}

interface DashboardProps {
	children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const {
		data: ordersData,
		isLoading: isLoadingOrders,
		isError: isErrorOrders,
	} = useOrders(undefined, currentPage, itemsPerPage);

	const OrderData: OrderGetType[] = ordersData?.data;
	const totalItems = ordersData?.totalItems || 0;
	const totalPages = ordersData?.totalPages || 1;

	const dashboardCardData: dashboardCardDataProps[] = [
		{
			id: 1,
			title: "Total Order",
			Icon: FiShoppingCart,
			quantity: OrderData?.length,
			className: "text-red-600 bg-red-200",
		},
	];
	const pathname = usePathname();
	const handleLogOut = () => {
		signOut();
	};

	return (
		<div className='mx-auto mt-24 slg:mt-16 max-w-screen-2xl sm:px-10 mb-32'>
			<div className='py-10 lg:py-12 flex flex-col w-full gap-2 slg:gap-6 min-h-[300px]'>
				<div className='flex-shrink-0 flex w-full px-2 mr-4 lg:mr-5 transition'>
					<div className='bg-white px-2 py-3 rounded-md sticky top-32 shadow-md flex flex-col lg:grid grid-cols-5 w-full gap-3'>
						{userSidebar.map((item) => (
							<Link
								key={item.title}
								href={item.href}
								className={`p-3 text-base grid w-fit slg:flex slg:w-full items-center gap-3 rounded-md border ${
									pathname.includes(item.href)
										? "text-primary border-primary"
										: "text-black"
								} hover:bg-gray-50 w-full hover:text-primary`}
							>
								<item.icon
									className='flex-shrink-0 h-8 w-8 slg:h-5 slg:w-5 cursor-pointer'
									aria-hidden='true'
								/>
								<span className='inline-flex items-center justify-between text-xs slg:text-base font-medium w-full hover:text-primary'>
									{item.title}
								</span>
							</Link>
						))}
						<span className='p-3 grid slg:flex items-center border gap-3 rounded-md hover:bg-gray-50 w-full hover:text-primary text-base cursor-pointer'>
							<BiLogOut className='text-3xl slg:text-2xl' />
							<button
								onClick={handleLogOut}
								className='inline-flex items-center justify-between font-medium text-xs slg:text-base w-full hover:text-primary'
							>
								Logout
							</button>
						</span>
					</div>
				</div>
				<div className='w-full flex-1 bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden shadow-md min-h-[450px]'>
					{!children && (
						<div className='overflow-hidden'>
							<div className='overflow-x-auto mb-8 flex gap-2'>
								{dashboardCardData.map((data) => (
									<DashboardCard
										key={data?.id}
										Icon={data?.Icon}
										quantity={data?.quantity}
										title={data?.title}
										className={data?.className}
									/>
								))}
							</div>
							<RecentOrder
								data={OrderData}
								isLoading={isLoadingOrders}
								ItemsPerPage={itemsPerPage}
								CurrentPage={currentPage}
								setCurrentPage={setCurrentPage}
								pageCount={totalPages}
							/>
						</div>
					)}
					{children}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
