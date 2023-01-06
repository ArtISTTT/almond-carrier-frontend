import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { OrderSeachType } from '../../interfaces/order-search';
import { Typography } from '@mui/material';
import cn from 'classnames';

type IProps = {
    type: OrderSeachType;
    setType: (type: OrderSeachType) => void;
};

const TypeSwitcher: React.FC<IProps> = ({ type, setType }) => {
    const switchType = () => {
        setType(
            type === OrderSeachType.carriers
                ? OrderSeachType.receivers
                : OrderSeachType.carriers
        );
    };

    return (
        <div className={styles.typeSwitcherWrapper}>
            <div className={styles.typeSwitcher}>
                <span
                    className={cn(styles.on, {
                        [styles.selected]: type === OrderSeachType.carriers,
                    })}
                    onClick={switchType}
                >
                    Order
                </span>
                <span
                    className={cn(styles.off, {
                        [styles.selected]: type === OrderSeachType.receivers,
                    })}
                    onClick={switchType}
                >
                    Deliver
                </span>
            </div>
            <Typography
                variant='h3'
                component='h3'
                className={styles.typeTitle}
            >
                {type === OrderSeachType.carriers
                    ? 'Currently looking for a carrier'
                    : 'Currently looking for a receiver'}
            </Typography>
        </div>
    );
};

export default TypeSwitcher;
