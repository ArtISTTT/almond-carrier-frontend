import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Button, Collapse, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderColors } from 'src/interfaces/loader';
import { OrderStatus } from 'src/interfaces/profile';
import styles from '../../../styles/OrderPage.module.css';
import CircleLoader from '../Loaders/CircleLoader';
import OrderDataAfterPurchaseCarrier from './OrderConfirmation/carrier/OrderDataAfterPurchaseCarrier';
import OrderDataBeforePurchaseCarrier from './OrderConfirmation/carrier/OrderDataBeforePurchaseCarrier';

type IProps = {
    fileLinks?: string[];
    orderId: string;
    beforePurchasingItemFiles?: string[];
    orderStatus: OrderStatus;
};

const OrderConfirmationCarrier: React.FC<IProps> = ({
    orderId,
    orderStatus,
    beforePurchasingItemFiles,
    fileLinks,
}) => {
    const { t } = useTranslation();

    const [paymentOpened, setPaymentOpened] = useState<boolean>(false);
    const [isDataSending, setIsDataSending] = useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    const handleChange = () => setPaymentOpened(prev => !prev);

    const handlePhotoChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
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
                    <div className={styles.collapsedPaymentCarrier}>
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
                                <OrderDataBeforePurchaseCarrier
                                    orderId={orderId}
                                    setIsDataSending={setIsDataSending}
                                    fileLinks={fileLinks}
                                    beforePurchasingItemFiles={
                                        beforePurchasingItemFiles
                                    }
                                    orderStatus={orderStatus}
                                />
                            )}
                            {value === 1 && (
                                <OrderDataAfterPurchaseCarrier
                                    orderId={orderId}
                                    setIsDataSending={setIsDataSending}
                                    fileLinks={fileLinks}
                                    orderStatus={orderStatus}
                                />
                            )}
                        </div>

                        {isDataSending && (
                            <div className={styles.purchaseLoaderWrapper}>
                                <CircleLoader color={LoaderColors.PRIMARY} />
                            </div>
                        )}
                    </div>
                </Collapse>
            </div>
        </>
    );
};

export default OrderConfirmationCarrier;
