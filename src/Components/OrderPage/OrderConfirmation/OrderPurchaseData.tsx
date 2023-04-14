import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import purchaseStyles from '../../../../styles/drop-file-input.module.css';
import styles from '../../../../styles/OrderPage.module.css';
import { ImageConfig } from '../../drop-file-input/ImageConfig';
import PurshasePhoto from './PurshasePhoto';

type IProps = {
    fileLinks?: string[];
};

const OrderPurchaseData: React.FC<IProps> = ({ fileLinks }) => {
    const { t } = useTranslation();

    const [openedPhoto, setOpenedPhoto] = useState<string | undefined>(
        undefined
    );

    const changeView = (link: string) => {
        setOpenedPhoto(link);
    };

    return (
        <>
            <div className={styles.purchaseDataBlock}>
                {fileLinks &&
                    fileLinks.map(link => {
                        const linkFormat = link.split('.');

                        if (linkFormat[linkFormat.length - 1] !== 'pdf') {
                            return (
                                <div key={link}>
                                    <div
                                        className={styles.purchasePhotoBlock}
                                        onClick={() => changeView(link)}
                                    >
                                        <img
                                            className={styles.purchasePhoto}
                                            src={link}
                                        />
                                        <div
                                            className={
                                                styles.purchasePhotoHover
                                            }
                                        />
                                    </div>
                                    {openedPhoto && (
                                        <PurshasePhoto
                                            setOpenedPhoto={setOpenedPhoto}
                                            openedPhoto={openedPhoto}
                                        />
                                    )}
                                </div>
                            );
                        }

                        return null;
                    })}
            </div>

            {fileLinks &&
                fileLinks.map(link => {
                    const linkFormat = link.split('.');

                    if (linkFormat[linkFormat.length - 1] === 'pdf') {
                        return (
                            <Link key={link} target='_blank' href={link}>
                                <div
                                    className={
                                        purchaseStyles.dropFilePreviewItem
                                    }
                                >
                                    <img src={ImageConfig['pdf'].src} alt='' />
                                    <div
                                        className={
                                            purchaseStyles.dropFilePreviewItemInfo
                                        }
                                    >
                                        <p>{t('file')}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    }

                    return null;
                })}
        </>
    );
};

export default OrderPurchaseData;
