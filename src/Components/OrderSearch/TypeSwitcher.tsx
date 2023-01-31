import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { OrderSeachType } from '../../interfaces/order-search';
import { Typography } from '@mui/material';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

type IProps = {
    type: OrderSeachType;
    setType: (type: OrderSeachType) => void;
};

const TypeSwitcher: React.FC<IProps> = ({ type, setType }) => {
    const { t } = useTranslation();
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
                    {t('    ')}
                </span>
                <span
                    className={cn(styles.off, {
                        [styles.selected]: type === OrderSeachType.receivers,
                    })}
                    onClick={switchType}
                >
                    {t('deliver')}
                </span>
            </div>
            <Typography
                variant='h3'
                component='h3'
                className={styles.typeTitle}
            >
                {type === OrderSeachType.carriers
                    ? t('currentlyLookingForAReceiver')
                    : t('currentlyLookingForACarrier')}
            </Typography>
        </div>
    );
};

export default TypeSwitcher;
