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

interface IProps {
    closePopup: () => void;
    order: IOrder;
}
interface IForm {
    productName: string;
    productAmount: number | undefined;
    productWeight: number | undefined;
    productDescription: string;
}

const defaultValues = {
    productName: '',
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

    return (
        <ApplyPopup closePopup={closePopup}>
            <div className={styles.carrierCard}>
                <Avatar sx={{ width: 80, height: 80 }} />
                <div className={styles.carrierCardInfo}>
                    <Typography
                        className={styles.carrierName}
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
                        {t('rating')}: <span>5</span>
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
                <div className={styles.infoWayItems}>
                    <Stack
                        className={styles.infoWayLine}
                        direction='row'
                        spacing={4.25}
                    >
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            {t('to')}:
                        </Typography>
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            <span>{order.toLocation}</span>
                        </Typography>
                    </Stack>
                    <Stack
                        className={styles.infoWayLine}
                        direction='row'
                        spacing={2}
                    >
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            {t('from')}:
                        </Typography>

                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            <span>{order.fromLocation}</span>
                        </Typography>
                    </Stack>
                </div>

                <Stack direction='column' spacing={3}>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        {t('flightDate')}:
                        <span>{order.arrivalDate?.format('DD.MM.YYYY')}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        {t('benefit')}:{' '}
                        <span>
                            {formatAmount(
                                order.rewardAmount,
                                Currency.RUB,
                                true
                            )}
                        </span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        {t('maxWeight')}:
                        <span>
                            {order.carrierMaxWeight} {t('kg')}
                        </span>
                    </Typography>
                </Stack>
            </div>
            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack direction='row' spacing={3}>
                    <div className={styles.inputItem}>
                        <label htmlFor='productName'>{t('productName')}</label>
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
