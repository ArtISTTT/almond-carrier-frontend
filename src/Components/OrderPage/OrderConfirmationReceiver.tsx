import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Button, Collapse, Tab, Tabs } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    acceptReceiverAfterPurchaseData,
    acceptReceiverBeforePurchaseData,
} from 'src/api/order';
import { LoaderColors } from 'src/interfaces/loader';
import { OrderStatus } from 'src/interfaces/profile';
import styles from '../../../styles/OrderPage.module.css';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';
import OrderDataAfterPurchaseReceiver from './OrderConfirmation/receiver/OrderDataAfterPurchaseReceiver';
import OrderDataBeforePurshaceReceiver from './OrderConfirmation/receiver/OrderDataBeforePurshaceReceiver';

type IProps = {
    fileLinks?: string[];
    orderId: string;
    beforePurchasingItemFiles?: string[];
    orderStatus: OrderStatus;
};

const OrderConfirmationReceiver: React.FC<IProps> = ({
    orderId,
    beforePurchasingItemFiles,
    orderStatus,
    fileLinks,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [isReceiverDataBlockDisabled, setIsReceiverDataBlockDisabled] =
        useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    const handleChange = () => setPaymentOpened(prev => !prev);

    const handlePhotoChange = (_: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    const acceptAfterPurchaseData = async () => {
        setIsReceiverDataBlockDisabled(true);

        const data = await acceptReceiverAfterPurchaseData({ orderId });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('dataConfirmed'),
            });
            setIsReceiverDataBlockDisabled(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: t('dataConfirmedError'),
            });
            setIsReceiverDataBlockDisabled(false);
        }
    };

    const acceptBeforePurchaseData = async () => {
        setIsReceiverDataBlockDisabled(true);

        const data = await acceptReceiverBeforePurchaseData({ orderId });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('dataConfirmed'),
            });
            setIsReceiverDataBlockDisabled(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: t('dataConfirmedError'),
            });
            setIsReceiverDataBlockDisabled(false);
        }
    };

    return (
        <>
            {!isReceiverDataBlockDisabled && (
                <>
                    <div className={styles.orderPurchaseWrapper}>
                        <Button
                            variant='outlined'
                            className={styles.orderPaymentWrapperButton}
                            color='primary'
                            onClick={handleChange}
                        >
                            {t('stateOfTheProduct')}
                        </Button>
                        <Collapse in={paymentOpened}>
                            <div className={styles.collapsedPaymentReceiver}>
                                <div className={styles.collapseTabs}>
                                    <Tabs
                                        className={styles.tabs}
                                        value={value}
                                        TabIndicatorProps={{
                                            style: {
                                                background: 'white',
                                            },
                                        }}
                                        onChange={handlePhotoChange}
                                        orientation='vertical'
                                        aria-label='order tabs'
                                    >
                                        <Tab
                                            className={styles.tab}
                                            icon={<AddShoppingCartIcon />}
                                            iconPosition='start'
                                            label={t('beforePurchase')}
                                        />
                                        <Tab
                                            className={styles.tab}
                                            icon={<PriceCheckIcon />}
                                            iconPosition='start'
                                            label={t('afterPurchase')}
                                        />
                                        <Tab
                                            className={styles.tab}
                                            icon={<DoneAllIcon />}
                                            iconPosition='start'
                                            label={t('goodsReceipt')}
                                        />
                                    </Tabs>
                                </div>
                                <div className={styles.collapseTabsHorisontal}>
                                    <Tabs
                                        className={styles.tabs}
                                        value={value}
                                        TabIndicatorProps={{
                                            style: {
                                                background: 'white',
                                            },
                                        }}
                                        onChange={handlePhotoChange}
                                        orientation='horizontal'
                                        aria-label='profile tabs'
                                    >
                                        <Tab
                                            className={styles.tab}
                                            icon={<AddShoppingCartIcon />}
                                            iconPosition='start'
                                            label={t('beforePurchase')}
                                        />
                                        <Tab
                                            className={styles.tab}
                                            icon={<PriceCheckIcon />}
                                            iconPosition='start'
                                            label={t('afterPurchase')}
                                        />
                                        <Tab
                                            className={styles.tab}
                                            icon={<DoneAllIcon />}
                                            iconPosition='start'
                                            label={t('goodsReceipt')}
                                        />
                                    </Tabs>
                                </div>

                                <div className={styles.collapseContent}>
                                    {value === 0 && (
                                        <OrderDataBeforePurshaceReceiver
                                            acceptAfterPurchaseData={
                                                acceptBeforePurchaseData
                                            }
                                            orderId={orderId}
                                            orderStatus={orderStatus}
                                            fileLinks={
                                                beforePurchasingItemFiles
                                            }
                                            isReceiverDataBlockDisabled={
                                                isReceiverDataBlockDisabled
                                            }
                                        />
                                    )}
                                    {value === 1 && (
                                        <OrderDataAfterPurchaseReceiver
                                            acceptAfterPurchaseData={
                                                acceptAfterPurchaseData
                                            }
                                            orderId={orderId}
                                            orderStatus={orderStatus}
                                            fileLinks={fileLinks}
                                            isReceiverDataBlockDisabled={
                                                isReceiverDataBlockDisabled
                                            }
                                        />
                                    )}
                                </div>

                                {isReceiverDataBlockDisabled && (
                                    <div
                                        className={styles.purchaseLoaderWrapper}
                                    >
                                        <CircleLoader
                                            color={LoaderColors.PRIMARY}
                                        />
                                    </div>
                                )}
                            </div>
                        </Collapse>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderConfirmationReceiver;
