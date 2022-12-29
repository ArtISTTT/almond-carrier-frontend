import React from 'react';
import styles from '../../../styles/LittleOrder.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ILittleOrder {
    item?: string;
    to: string;
    benefit: number;
}

const LittleOrderItem: React.FC<ILittleOrder> = ({ item, to, benefit }) => {
    const chck = () => console.log('qwe');

    return (
        <div className={styles.littleOrder}>
            <div onClick={chck} className={styles.arrow}>
                <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
            </div>
            <div className={styles.littleOrderWrapper}>
                <div className={styles.littleOrderContent}>
                    <div className={styles.littleOrderItem}>{item}</div>
                    <div className={styles.littleOrderTo}>
                        FROM: <span>{to}</span>
                    </div>
                    <div className={styles.littleOrderBenefit}>
                        BENEFIT: <span>{benefit}$</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LittleOrderItem;
