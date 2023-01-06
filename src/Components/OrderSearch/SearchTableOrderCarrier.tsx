import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button } from '@mui/material';
import cn from 'classnames';

type IProps = {};

const SearchTableOrderCarrier: React.FC<IProps> = () => {
    return (
        <div className={styles.itemWrapper}>
            <div className={cn(styles.part, styles.user)}>
                <Avatar
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt='logo'
                />
                <div className={styles.userInfo}>
                    <div className={styles.userName}>Artem Velikii</div>
                    <div className={cn(styles.infoItem, styles.infoItemRating)}>
                        Rating: <span>4.64</span>
                    </div>
                    <div
                        className={cn(
                            styles.infoItem,
                            styles.infoItemCompleted
                        )}
                    >
                        Completed orders: <span>16</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.fromTo)}>
                <div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>From:</span>
                        <span>Moscow</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>To:</span>
                        <span>Antalya</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.flightDate)}>12.12.2023</div>
            <div className={cn(styles.part, styles.benefit)}>40$</div>
            <div className={cn(styles.part, styles.maxWeight)}>5kg</div>
            <div className={cn(styles.part)}>
                <Button variant='contained' className={styles.applyBtn}>
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default SearchTableOrderCarrier;
