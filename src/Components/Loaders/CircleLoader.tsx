import React from 'react';
import styles from '../../../styles/OrderLoader.module.css';
import cn from 'classnames';
import { LoaderColors } from 'src/interfaces/loader';
interface IProps {
    color: string;
}

const CircleLoader: React.FC<IProps> = ({ color }) => {
    return (
        <div className={styles.reviewsLoaderWrapper}>
            <div
                className={cn({
                    [styles.ldsRingReview]: color === LoaderColors.PRIMARY,
                    [styles.ldsRing]: color === LoaderColors.SECONDARY,
                })}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default CircleLoader;
