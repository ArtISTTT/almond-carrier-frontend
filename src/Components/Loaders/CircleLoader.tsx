import cn from 'classnames';
import React from 'react';
import { LoaderColors } from 'src/interfaces/loader';
import styles from '../../../styles/CircleLoader.module.css';
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
