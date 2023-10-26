import cn from 'classnames';
import React from 'react';
import styles from '../../../styles/Payments.module.css';

type IProps = {
    id: string;
    name: string;
    number: string;
    bankName: string;
    selectedCard: string;
    onSetSelectedCard: (value: string) => void;
};

const CardItem: React.FC<IProps> = ({
    number,
    name,
    bankName,
    onSetSelectedCard,
    id,
    selectedCard,
}) => {
    const onSelect = () => onSetSelectedCard(id);

    return (
        <div
            onClick={onSelect}
            className={cn(styles.cardItemWrapper, {
                [styles.selectedCard]: selectedCard === id,
            })}
        >
            <div className={styles.cardItemBank}>{bankName}</div>
            <div className={styles.cardItemNumber}>{number}</div>
            <div className={styles.cardItemName}>{name}</div>
        </div>
    );
};

export default CardItem;
