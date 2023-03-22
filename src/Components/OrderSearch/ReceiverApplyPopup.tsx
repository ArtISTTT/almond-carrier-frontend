import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
    Avatar,
    Button,
    Link as MUILink,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IBounds } from 'src/interfaces/geometry';
import { navigateTo } from 'src/interfaces/navigate';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { ReceiverApplyPopupSchema } from 'src/schemas/ApplyPopupSchemas';
import styles from '../../../styles/ApplyPopup.module.css';
import { applyOrderAsCarrier } from '../../api/order';
import { IOrder } from '../../interfaces/order';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { OpenAlertContext } from '../Layouts/Snackbar';
import ApplyPopup from './ApplyPopup';

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
    fromLocationBounds: {},
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
        placeId: string,
        bounds: IBounds
    ) => {
        await formik.setFieldValue(id, value);
        await formik.setFieldValue(id + '_placeId', placeId);
        await formik.setFieldValue(id + 'Bounds', bounds);
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
                    src={order.receiver?.avatar}
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
                        {t('rating')}:{' '}
                        <span>
                            {order.receiver?.rating
                                ? order.receiver?.rating
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
            <div className={styles.receiverInfo}>
                <Typography
                    className={cn(styles.infoItem, styles.infoItemFirst)}
                    variant='h5'
                    component='p'
                >
                    <p>{t('productName')}:</p>
                    <span>
                        <ShoppingBasketIcon
                            className={styles.productIcon}
                            sx={{ height: 17, width: 17 }}
                        />
                        <span>{order.productName}</span>
                        <ShoppingBasketIcon
                            className={styles.productIcon}
                            sx={{ height: 17, width: 17 }}
                        />
                    </span>
                </Typography>
                {order.productUri && (
                    <Typography
                        className={cn(styles.infoItem, styles.infoItemLink)}
                        variant='h5'
                        component='p'
                    >
                        <p>{t('link')}:</p>
                        <span>
                            <MUILink
                                component={LinkBehaviour}
                                href={order.productUri}
                                target='_blank'
                            >
                                {order.productUri}
                            </MUILink>
                        </span>
                    </Typography>
                )}

                <Typography
                    className={styles.infoItem}
                    variant='h5'
                    component='p'
                >
                    <p>{t('to')}:</p>
                    <span>{order.toLocation}</span>
                </Typography>

                {order.fromLocation && (
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        <p>{t('from')}:</p> <span>{order.fromLocation}</span>
                    </Typography>
                )}

                <Stack className={styles.infoCol} direction='column'>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        <p>{t('price')}:</p>
                        <span className={styles.infoPriceValue}>
                            {order.productAmount !== undefined &&
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
                        <span>
                            {order.productWeight} {t('kg')}
                        </span>
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
                <Stack className={styles.formItems} direction='column'>
                    {!order.fromLocation && (
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='fromLocation'>{t('from')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    placeholder: t('enterLocation') as string,
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
