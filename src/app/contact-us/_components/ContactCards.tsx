"use client";
import ContactCard from "@src/components/Cards/ContactCard";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

const ContactCards = () => {
	const { data: generalSettings, isLoading, isError } = useGeneralSettings();

	const GeneralSettings: WooCommerceSetting[] = generalSettings;

	const contactCardData = [
		{
			id: 1,
			title: "Call Us",
			icon: <FiPhoneCall className='text-primary text-2xl xl:text-4xl' />,
			type: "tel",
			additionalText: GeneralSettings ? GeneralSettings[1]?.value : "N/A",
		},
		{
			id: 2,
			title: "Email Us",
			type: "email",
			icon: <RxEnvelopeClosed className='text-primary text-2xl xl:text-4xl' />,
			additionalText: GeneralSettings ? GeneralSettings[0]?.value : "N/A",
		},
		{
			id: 3,
			title: "Location",
			type: "text",
			icon: <IoLocationOutline className='text-primary text-2xl xl:text-4xl' />,
			description: GeneralSettings ? GeneralSettings[2]?.value : "N/A",
		},
		// Add more contact card data here if needed
	];
	return (
		<>
			{contactCardData.map((card) => (
				<ContactCard
					key={card.id}
					isLoading={isLoading}
					type={card.type}
					title={card.title}
					icon={card.icon}
					additionalText={card.additionalText}
					// additionalText2={card.additionalText2}
					description={card.description}
				/>
			))}
		</>
	);
};

export default ContactCards;
