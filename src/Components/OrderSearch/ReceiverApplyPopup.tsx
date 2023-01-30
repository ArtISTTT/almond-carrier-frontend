import {
    Avatar,
    Button,
    Typography,
    TextField,
    Stack,
    Tooltip,
} from '@mui/material';
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
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { navigateTo } from 'src/interfaces/navigate';

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

    const navigateToUserPage = (): void => {
        push({
            pathname: navigateTo.USER,
            query: { userId: order.receiver?.id },
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
                <div className={styles.infoWayItems}>
                    <Stack
                        className={styles.infoWayLine}
                        direction='row'
                        spacing={3.25}
                    >
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            <p>{t('productItem')}:</p>
                        </Typography>
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            <span>{order.productName}</span>
                        </Typography>
                    </Stack>
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
                            <p>{t('to')}:</p>
                        </Typography>
                        <Tooltip title={order.toLocation} placement='bottom'>
                            <Typography
                                className={styles.infoItemWay}
                                variant='h5'
                                component='p'
                            >
                                <span>{order.toLocation}</span>
                            </Typography>
                        </Tooltip>
                    </Stack>
                    {order.fromLocation && (
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
                            <Tooltip
                                title={order.fromLocation}
                                placement='bottom'
                            >
                                <Typography
                                    className={styles.infoItemWay}
                                    variant='h5'
                                    component='p'
                                >
                                    <span>{order.fromLocation}</span>
                                </Typography>
                            </Tooltip>
                        </Stack>
                    )}
                </div>
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
                        <p>{t('price')}:</p>
                        <span className={styles.infoPriceValue}>
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
                        <p>{t('benefit')}:</p>
                        <span className={styles.infoPriceValue}>
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
                        <p>{t('weight')}</p>
                        <span>{order.productWeight} </span>
                    </Typography>
                </Stack>
            </div>
            <div className={styles.carrierDescription}>
                <div className={styles.productName}>{t('description')}</div>
                <div className={styles.productDescription}>
                    {order.productDescription}
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack className={styles.formItems} direction='row' spacing={2}>
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
                    <div
                        className={cn(styles.inputItem, styles.inputItemSecond)}
                    >
                        <label htmlFor='arrivalDate'>{t('date')}</label>
                        <DesktopDatePicker
                            inputFormat='DD.MM.YYYY'
                            value={formik.values.arrivalDate}
                            disablePast={true}
                            onChange={value => {
                                formik.setFieldValue('arrivalDate', value);
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    id='arrivalDate'
                                    name='arrivalDate'
                                    variant='outlined'
                                    className={cn(styles.onlyDateInput, {
                                        [styles.input]: order.fromLocation,
                                    })}
                                    error={
                                        formik.errors.arrivalDate !== undefined
                                    }
                                    helperText={
                                        formik.errors.arrivalDate &&
                                        t('futureDate')
                                    }
                                />
                            )}
                        />
                    </div>
                </Stack>
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
