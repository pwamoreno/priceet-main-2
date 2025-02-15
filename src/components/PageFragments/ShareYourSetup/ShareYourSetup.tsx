import classes from './ShareYourSetup.module.css';
import Image from 'next/image'
import share from './share.png';


export function ShareYourSetup() {
    return (
        <div className={classes.component}>
            <div className={classes.wrapper}>
                <p className={classes.description}>
                    Share your setup with
                </p>
                <h3 className={classes.title}>
                    #TrendingFurniture
                </h3>
                <Image src={share} className={classes.image} alt="#TrendingFurniture" title="#TrendingFurniture" />
            </div>
        </div>
    )
}