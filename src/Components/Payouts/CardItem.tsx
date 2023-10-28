import cn from 'classnames';
import React from 'react';
import { ICard } from 'src/interfaces/order';
import styles from '../../../styles/Payments.module.css';

type IProps = {
    id: string;
    name: string;
    number: string;
    bankName: string;
    selectedCard?: ICard;
    onSetSelectedCard: (value: ICard) => void;
    watchOnly?: boolean;
};

const CardItem: React.FC<IProps> = ({
    number,
    name,
    bankName,
    onSetSelectedCard,
    id,
    selectedCard,
    watchOnly,
}) => {
    const onSelect = () => {
        if (watchOnly) return;

        onSetSelectedCard({ id, name, number, bankName } as ICard);
    };

    return (
        <div
            onClick={onSelect}
            className={cn(styles.cardItemWrapper, {
                [styles.selectedCard]: selectedCard?.id === id,
                [styles.noSelectedCard]: selectedCard?.id !== id && !watchOnly,
            })}
        >
            <div className={styles.cardItemBank}>{bankName}</div>
            <div className={styles.cardItemNumber}>{number}</div>
            <div className={styles.cardItemName}>{name}</div>
        </div>
    );
};

export default CardItem;
