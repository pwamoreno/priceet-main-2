import classes from './HeroSection.module.css';
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";


export function HeroSection() {
    return (
        <div className={classes.wrapper}>
            <div className="container">
              <div className="max-w-lg text-white">
                <h2 className='text-7xl font-bold leading-tight mb-6 max-sm:mt-8'>Sale of the summer collection</h2>
                <Link href="/category" className="inline-flex items-center text-white">
                <span className="bg-[#427695] px-3 py-3 rounded-full font-semibold hover:bg-blue-900 hover:cursor-pointer transition mr-2"><FiArrowRight /></span> Shop now
                </Link>
              </div>
            </div>
            {/* <div className={classes.content}>
                <span className={classes.subtitle}>
                    🎉 Unbeatable Savings 🎉
                </span>
                <h1 className={classes.title}>
                    Discover Our <br /> New Collection
                </h1>
                <p className={classes.description}>
                    Don&rsquo;t miss out on the best deals!
                </p>
                <Link href='/category'>
                    <div className={classes.button}>
                        BUY NOW
                    </div>
                </Link>
            </div> */}
        </div>
    )
}