import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/OrderPage.module.css';
import { IOrderFull } from 'src/interfaces/order';
import { Collapse, Button, Typography } from '@mui/material';
import { useAppSelector } from 'src/redux/hooks';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import cn from 'classnames';
import { MuiTelInput } from 'mui-tel-input';
import { useFormik } from 'formik';

type IProps = {
    order: IOrderFull;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

type IForm = {
    phone: string;
};

const OrderPaymentSuccess: React.FC<IProps> = ({ order, updateOrder }) => {
    const [paymentOpened, setPaymentOpened] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const carrierPhoneNumber = useAppSelector(
        ({ user }) => user.data?.phoneNumber
    );

    const handleChange = () => setPaymentOpened(prev => !prev);

    const handlePhoneChange = (phone: string) =>
        formik.setFieldValue('phone', phone);

    const enterUserPhone = () =>
        formik.setFieldValue('phone', carrierPhoneNumber);

    const confirmPhoneNumber = () => setPaymentOpened(false);

    const handleSubmit = (form: IForm) => {};

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        onSubmit: handleSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <div className={styles.orderPaymentWrapper}>
            <Button
                variant='outlined'
                className={styles.orderPaymentWrapperButton}
                color='primary'
                onClick={handleChange}
            >
                {t('enterDetails')}
            </Button>
            <Collapse in={paymentOpened}>
                <div className={styles.collapsedPayment}>
                    <Typography
                        variant='h6'
                        component='h4'
                        className={styles.detailsBlock}
                    >
                        {t('specifyTheDetailsRequiredToReceiveTheAward')}
                    </Typography>
                    <form onSubmit={formik.handleSubmit} action='submit'>
                        <div className={styles.inputPhoneBlock}>
                            <div className={styles.inputItem}>
                                <MuiTelInput
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    placeholder={t('phoneNumber') as string}
                                    variant='outlined'
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                    value={formik.values.phone}
                                    onChange={handlePhoneChange}
                                    className={cn(
                                        styles.input,
                                        styles.inputPhone
                                    )}
                                />
                            </div>

                            <Button
                                variant='text'
                                className={styles.confirmPhoneButton}
                                onClick={enterUserPhone}
                                color='primary'
                            >
                                {t('useYourPhone')}
                            </Button>
                        </div>
                    </form>
                    <Button
                        variant='contained'
                        className={styles.orderConfirmPaymentButton}
                        color='primary'
                        onClick={confirmPhoneNumber}
                    >
                        {t('confirm')}
                    </Button>
                </div>
            </Collapse>
        </div>
    );
};

export default OrderPaymentSuccess;
