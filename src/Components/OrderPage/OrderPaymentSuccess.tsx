import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/OrderPage.module.css';
import {
    Collapse,
    Button,
    InputLabel,
    Typography,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import { useAppSelector } from 'src/redux/hooks';
import cn from 'classnames';
import { MuiTelInput } from 'mui-tel-input';
import { useFormik } from 'formik';
import { Banks } from 'src/interfaces/user';
import { OrderPaymentSuccessSchema } from 'src/schemas/OrderPaymentSuccess';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';

type IForm = {
    bank: Banks;
    phone: string;
};

const OrderPaymentSuccess: React.FC = ({}) => {
    const [paymentOpened, setPaymentOpened] = React.useState<boolean>(false);
    const { t } = useTranslation();
    const banksArray = useGetBanks();

    const carrierPhoneNumber = useAppSelector(
        ({ user }) => user.data?.phoneNumber
    );

    const handleChange = () => setPaymentOpened(prev => !prev);

    const handlePhoneChange = (phone: string) =>
        formik.setFieldValue('phone', phone);

    const handleSubmit = (form: IForm) => {};

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
                        {t('specifyTheDetailsRequiredToReceiveTheAward')}
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
                                    value={formik.values.phone}
                                    onChange={handlePhoneChange}
                                    className={cn(
                                        styles.input,
                                        styles.inputPhone
                                    )}
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
                            onClick={handleChange}
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
