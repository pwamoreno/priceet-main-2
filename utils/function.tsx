import { logoImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";

interface LogoImageProps {
	className?: string;
}

export const LogoImage = ({ className }: LogoImageProps) => {
	return (
		<Link href='/'>
			<Picture
				src={logoImage}
				alt='lendo credit logo'
				priority
				loading='lazy'
				className={`w-[150px] lg:w-[165px] xl:w-[196px] max-h-[40px] duration-300 hover:scale-105 transition-[.3] hover:animate-pulse ${className}`}
			/>
		</Link>
	);
};
