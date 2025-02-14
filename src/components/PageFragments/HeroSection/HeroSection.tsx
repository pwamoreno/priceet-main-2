import classes from './HeroSection.module.css';
import Link from 'next/link';


export function HeroSection() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
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
            </div>
        </div>
    )
}