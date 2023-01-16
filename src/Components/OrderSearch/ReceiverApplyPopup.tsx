import { Avatar, Button, Typography, TextField, Stack } from '@mui/material';
import React, { useContext } from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';
import cn from 'classnames';
import { useFormik } from 'formik';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { useRouter } from 'next/router';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { applyOrderAsCarrier } from '../../api/order';
import { useTranslation } from 'react-i18next';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';
import { ReceiverApplyPopupSchema } from 'src/schemas/ApplyPopupSchemas';

interface IProps {
    closePopup: () => void;
    order: IOrder;
}
interface IForm {
    fromLocation?: string;
    fromLocation_placeId: string;
    arrivalDate: Date;
}

const defaultValues = {
    fromLocation: '',
    fromLocation_placeId: '',
    arrivalDate: new Date(),
};

const ReceiverApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
    const { push } = useRouter();
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const { triggerOpen } = useContext(OpenAlertContext);

    const apply = async (form: IForm) => {
        const data = await applyOrderAsCarrier({ ...form, orderId: order.id });

        if (data.ok && data.orderId) {
            triggerOpen({
                severity: 'success',
                text: 'You have successfully responded to the order.',
            });
            push(`/order/${data.orderId}`);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to apply to an order',
            });
            formik.setSubmitting(false);
        }

        closePopup();
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: apply,
        validationSchema: ReceiverApplyPopupSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const setLocationValue = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        await formik.setFieldValue(id, value);
        await formik.setFieldValue(id + '_placeId', placeId);
    };

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
                        {order.receiver?.firstName} {order.receiver?.lastName}
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
            <div className={styles.receiverInfo}>
                <Stack
                    className={styles.infoCol}
                    direction='column'
                    spacing={3}
                >
                    <Typography
                        className={styles.infoItemWay}
                        variant='h5'
                        component='p'
                    >
                        {t('to')}:
                    </Typography>
                    {order.fromLocation && (
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            {t('from')}:
                        </Typography>
                    )}
                </Stack>
                <Stack
                    className={styles.infoCol}
                    direction='column'
                    spacing={3}
                >
                    <Typography
                        className={styles.infoItemWay}
                        variant='h5'
                        component='p'
                    >
                        <span>{order.toLocation}</span>
                    </Typography>
                    {order.fromLocation && (
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            <span>{order.fromLocation}</span>
                        </Typography>
                    )}
                </Stack>
                <Stack
                    className={styles.infoCol}
                    direction='column'
                    spacing={3}
                >
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        {t('price')}:
                        <span>
                            {order.productAmount &&
                                formatAmount(
                                    order.productAmount,
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
                        {t('weight')}
                        <span>{order.productWeight} </span>
                    </Typography>
                </Stack>
            </div>
            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack direction='row' spacing={2}>
                    {!order.fromLocation && (
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='fromLocation'>{t('from')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value: formik.values.fromLocation,
                                    onChange: formik.handleChange,
                                    className: styles.input,
                                    error:
                                        formik.errors.fromLocation !==
                                        undefined,
                                    helperText:
                                        formik.errors.fromLocation &&
                                        (t(
                                            formik.errors.fromLocation
                                        ) as string),
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                    )}
                    <div className={styles.inputItem}>
                        <label htmlFor='arrivalDate'>{t('date')}</label>
                        <TextField
                            id='arrivalDate'
                            name='arrivalDate'
                            type='date'
                            variant='outlined'
                            value={formik.values.arrivalDate}
                            onChange={formik.handleChange}
                            className={cn(styles.onlyDateInput, {
                                [styles.input]: order.fromLocation,
                            })}
                            error={formik.errors.arrivalDate !== undefined}
                            helperText={
                                formik.errors.arrivalDate && t('correctDate')
                            }
                        />
                    </div>
                </Stack>
                <div className={styles.carrierDescription}>
                    <div className={styles.productName}>
                        {order.productName}
                    </div>
                    <div className={styles.productDescription}>
                        {order.productDescription}
                    </div>
                </div>
                <Button
                    type='submit'
                    className={styles.carrierApplyButton}
                    variant='contained'
                >
                    {t('applyToOrder')}
                </Button>
            </form>
        </ApplyPopup>
    );
};

export default ReceiverApplyPopup;
