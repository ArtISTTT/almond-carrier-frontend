import {
    Button,
    Collapse,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { startPayout } from 'src/api/order';
import { IOrderFull } from 'src/interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { Currency } from 'src/interfaces/settings';
import { Banks } from 'src/interfaces/user';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';
import { OrderPaymentSuccessSchema } from 'src/schemas/OrderPaymentSuccess';
import styles from '../../../styles/OrderPage.module.css';
import { OpenAlertContext } from '../Layouts/Snackbar';

type IForm = {
    bank: Banks;
    phone: string;
};

interface IProps {
    order: IOrderFull;
}

const OrderPaymentSuccess: React.FC<IProps> = ({ order }) => {
    const [paymentOpened, setPaymentOpened] = React.useState<boolean>(false);
    const { triggerOpen } = useContext(OpenAlertContext);
    const formatAmount = useFormatAmount();
    const { t } = useTranslation();
    const { banksArray } = useGetBanks({});

    const carrierPhoneNumber = useAppSelector(
        ({ user }) => user.data?.phoneNumber
    );

    const handleChange = () => setPaymentOpened(prev => !prev);

    const handleSubmit = async (form: IForm) => {
        const data = await startPayout({
            orderId: order.id,
            phoneNumber: form.phone,
            bank: form.bank,
        });
        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('payoutDataSeccessfullySent'),
            });
            setPaymentOpened(prev => !prev);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSendPayoutData'),
            });
        }
    };

    const handlePhoneChange = (phone: string) =>
        formik.setFieldValue('phone', phone);

    const formik = useFormik({
        initialValues: {
            phone: carrierPhoneNumber || '',
            bank: Banks.SBER,
        },
        onSubmit: handleSubmit,
        validationSchema: OrderPaymentSuccessSchema,
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
                        {t('provideDetailsForReceivingTheRewardOf')}{' '}
                        {formatAmount(order.rewardAmount, Currency.RUB, true)}
                    </Typography>
                    <form onSubmit={formik.handleSubmit} action='submit'>
                        <div className={styles.inputPhoneBlock}>
                            <div className={styles.inputItem}>
                                <InputLabel
                                    className={styles.inputTitle}
                                    id='phone'
                                >
                                    {t('phoneNumber')}
                                </InputLabel>
                                <MuiTelInput
                                    id='phone'
                                    name='phone'
                                    placeholder={t('phoneNumber') as string}
                                    variant='outlined'
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                    disabled={
                                        order.status ===
                                        OrderStatus.awaitingPayout
                                    }
                                    value={formik.values.phone}
                                    onChange={handlePhoneChange}
                                    className={cn(
                                        styles.input,
                                        styles.inputPhone
                                    )}
                                    error={formik.errors.phone !== undefined}
                                    helperText={
                                        formik.errors.phone &&
                                        (t(formik.errors.phone) as string)
                                    }
                                />
                            </div>
                            <div className={styles.inputItem}>
                                <InputLabel
                                    className={styles.inputTitle}
                                    id='bank'
                                >
                                    {t('bank')}
                                </InputLabel>
                                <FormControl
                                    sx={{ width: 250 }}
                                    className={styles.input}
                                >
                                    <Select
                                        id='bank'
                                        name='bank'
                                        value={formik.values.bank}
                                        onChange={formik.handleChange}
                                        disabled={
                                            order.status ===
                                            OrderStatus.awaitingPayout
                                        }
                                        MenuProps={{
                                            disableScrollLock: true,
                                        }}
                                        className={styles.selectBank}
                                    >
                                        {banksArray.map(bank => {
                                            return (
                                                <MenuItem
                                                    className={
                                                        styles.bankElement
                                                    }
                                                    key={bank.value}
                                                    value={bank.value}
                                                >
                                                    <img src={bank.image.src} />
                                                    {bank.text}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <Button
                            variant='contained'
                            type='submit'
                            className={styles.orderConfirmPaymentButton}
                            color='primary'
                        >
                            {t('confirm')}
                        </Button>
                    </form>
                </div>
            </Collapse>
        </div>
    );
};

export default OrderPaymentSuccess;
