import {
    Avatar,
    Button,
    Typography,
    TextField,
    Stack,
    InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';
import { useRouter } from 'next/router';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { applyOrderAsReceiver } from '../../api/order';
import { useTranslation } from 'react-i18next';
import { CarrierApplyPopupSchema } from 'src/schemas/ApplyPopupSchemas';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';
import { useAppSelector } from 'src/redux/hooks';
import { navigateTo } from 'src/interfaces/navigate';

interface IProps {
    closePopup: () => void;
    order: IOrder;
}
interface IForm {
    productName: string;
    productLink: string;
    productAmount: number | undefined;
    productWeight: number | undefined;
    productDescription: string;
}

const defaultValues = {
    productName: '',
    productLink: '',
    productAmount: undefined,
    productWeight: undefined,
    productDescription: '',
};

const userCurrency = {
    [Currency.RUB]: 'RUB',
    [Currency.EUR]: 'EUR',
    [Currency.USD]: 'USD',
};

const CarrierApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
    const { push } = useRouter();
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const { triggerOpen } = useContext(OpenAlertContext);

    const { currency } = useAppSelector(
        ({ settings }) => settings.generalSettings
    );

    const apply = async (form: IForm) => {
        const data = await applyOrderAsReceiver({ ...form, orderId: order.id });

        if (data.ok && data.orderId) {
            triggerOpen({
                severity: 'success',
                text: t('successRespondedOrder'),
            });
            push(`/order/${data.orderId}`);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorApplyToOrder'),
            });
            formik.setSubmitting(false);
        }
        closePopup();
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: apply,
        validationSchema: CarrierApplyPopupSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const navigateToUserPage = (): void => {
        push({
            pathname: navigateTo.USER,
            query: { userId: order.carrier?.id },
        });
    };

    return (
        <ApplyPopup closePopup={closePopup}>
            <div className={styles.carrierCard}>
                <Avatar
                    onClick={navigateToUserPage}
                    sx={{ width: 80, height: 80, cursor: 'pointer' }}
                />
                <div className={styles.carrierCardInfo}>
                    <Typography
                        className={styles.carrierName}
                        onClick={navigateToUserPage}
                        variant='h4'
                        component='h3'
                    >
                        {order.carrier?.firstName} {order.carrier?.lastName}
                    </Typography>
                    <Typography
                        className={styles.carrierRating}
                        variant='h4'
                        component='h3'
                    >
                        {t('rating')}:{' '}
                        <span>
                            {order.carrier?.rating
                                ? order.carrier?.rating
                                : '-'}
                        </span>
                    </Typography>
                    <Typography
                        className={styles.carrierCompletedOrders}
                        variant='h4'
                        component='h3'
                    >
                        {t('completedOrders')}: <span>4</span>
                    </Typography>
                </div>
            </div>

            <div className={styles.carrierInfo}>
                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('to')}:</p>
                    <span>{order.toLocation}</span>
                </Typography>
                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('from')}:</p>
                    <span>{order.fromLocation}</span>
                </Typography>
                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('flightDate')}:</p>
                    <span>{order.arrivalDate?.format('DD.MM.YYYY')}</span>
                </Typography>
                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('benefit')}: </p>
                    <span>
                        {formatAmount(order.rewardAmount, Currency.RUB, true)}
                    </span>
                </Typography>
                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('maxWeight')}:</p>
                    <span>
                        {order.carrierMaxWeight} {t('kg')}
                    </span>
                </Typography>
            </div>

            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack direction='column' className={styles.stackDistance}>
                    <div className={styles.inputItem}>
                        <label htmlFor='productName'>{t('product')}</label>
                        <TextField
                            id='productName'
                            name='productName'
                            variant='outlined'
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            className={styles.input}
                            error={formik.errors.productName !== undefined}
                            helperText={
                                formik.errors.productName &&
                                (t(formik.errors.productName) as string)
                            }
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor='productLink'>{t('productLink')}</label>
                        <TextField
                            id='productLink'
                            name='productLink'
                            variant='outlined'
                            value={formik.values.productLink}
                            placeholder='example.com'
                            onChange={formik.handleChange}
                            className={styles.input}
                            error={formik.errors.productLink !== undefined}
                            helperText={
                                formik.errors.productLink &&
                                (t(formik.errors.productLink) as string)
                            }
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor='productAmount'>{t('price')}</label>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {t(userCurrency[currency])}
                                    </InputAdornment>
                                ),
                            }}
                            id='productAmount'
                            name='productAmount'
                            variant='outlined'
                            type='number'
                            value={formik.values.productAmount}
                            onChange={formik.handleChange}
                            className={styles.input}
                            error={formik.errors.productAmount !== undefined}
                            helperText={
                                formik.errors.productAmount &&
                                (t(formik.errors.productAmount) as string)
                            }
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor='productWeight'>{t('weight')}</label>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {t('kg')}
                                    </InputAdornment>
                                ),
                                inputProps: { max: 40 },
                            }}
                            id='productWeight'
                            name='productWeight'
                            variant='outlined'
                            type='number'
                            value={formik.values.productWeight}
                            onChange={formik.handleChange}
                            className={styles.input}
                            error={formik.errors.productWeight !== undefined}
                            helperText={
                                formik.errors.productWeight &&
                                (t(formik.errors.productWeight) as string)
                            }
                        />
                    </div>
                </Stack>
                <div className={styles.carrierDescription}>
                    <Typography
                        className={styles.carrierDescriptionTitle}
                        variant='h6'
                        component='h4'
                    >
                        {t('description')}:
                    </Typography>
                    <TextField
                        id='productDescription'
                        name='productDescription'
                        placeholder={t('someWordsAboutOrders') as string}
                        variant='outlined'
                        multiline
                        minRows={4}
                        maxRows={4}
                        value={formik.values.productDescription}
                        onChange={formik.handleChange}
                        className={styles.carrierDescriptionBody}
                        error={formik.errors.productDescription !== undefined}
                        helperText={
                            formik.errors.productDescription &&
                            (t(formik.errors.productDescription) as string)
                        }
                    />
                </div>
                <Button
                    type='submit'
                    className={styles.carrierApplyButton}
                    variant='contained'
                >
                    {t('applyForOrder')}
                </Button>
            </form>
        </ApplyPopup>
    );
};

export default CarrierApplyPopup;
