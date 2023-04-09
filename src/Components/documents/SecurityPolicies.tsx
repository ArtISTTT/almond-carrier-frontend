import cn from 'classnames';
import React from 'react';
import styles from '../../../styles/Document.module.css';

export const SecurityPolicies: React.FC = () => {
    return (
        <div className={styles.document}>
            <h1 className={styles.headTitle}>Политика безопасности платежей</h1>
            <div className={styles.partners}>
                <img
                    className={styles.partnerItem}
                    src='/static/images/partners/visa.png'
                />
                <img
                    className={styles.partnerItem}
                    src='/static/images/partners/mastercard.png'
                />
                <img
                    className={styles.partnerItem}
                    src='/static/images/partners/mir.png'
                />
                <img
                    className={styles.partnerItem}
                    src='/static/images/partners/paygine.png'
                />
            </div>
            <p className={cn(styles.textNoSpace, styles.textHighMargin)}>
                Оплатить заказ можно с помощью банковских карт платёжных систем
                Visa, MasterCard, МИР. При оплате банковской картой безопасность
                платежей гарантирует процессинговый центр{' '}
                <a href='https://paygine.ru/' target='_blank' rel="noreferrer">
                    Paygine
                </a>
            </p>
            <p className={cn(styles.textNoSpace, styles.textHighMargin)}>
                Приём платежей происходит через защищённое безопасное
                соединение, используя протокол TLS 1.2. Компания{' '}
                <a href='https://paygine.ru/' target='_blank' rel="noreferrer">
                    Paygine
                </a>{' '}
                соответствует международным требованиями PCI DSS для обеспечения
                безопасной обработки реквизитов банковской карты плательщика.
                Ваши конфиденциальные данные необходимые для оплаты (реквизиты
                карты, регистрационные данные и др.) не поступают в
                Интернет-магазин, их обработка производится на стороне
                процессингового центра{' '}
                <a href='https://paygine.ru/' target='_blank' rel="noreferrer">
                    Paygine
                </a>{' '}
                и полностью защищена. Никто, в том числе интернет-магазин{' '}
                <a href='https://friendlycarrier.com/' target='_blank' rel="noreferrer">
                    Friendly Carrier
                </a>
                , не может получить банковские и персональные данные
                плательщика.
            </p>
            <p className={cn(styles.textNoSpace, styles.textHighMargin)}>
                При оплате заказа банковской картой возврат денежных средств
                производится на ту же самую карту, с которой был произведён
                платёж.
            </p>
        </div>
    );
};
