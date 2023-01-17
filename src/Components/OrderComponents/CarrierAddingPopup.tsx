import { Button, InputAdornment, TextField } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React, { useContext} from 'react';
import { useFormik } from 'formik';
import { Stack } from '@mui/system';
import { CarrierPopupSchema } from '../../schemas/PopupSchema';
import Popup from './Popup';
import { ICreateOrderCarrier } from '../../interfaces/order';
import { addOrderAsACarrier } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { useTranslation } from 'react-i18next';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAppSelector } from 'src/redux/hooks';
import { Currency } from 'src/interfaces/settings';
interface IProps {
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => Promise<void>;
}

const defaultValues = {
    toLocation: '',
    toLocation_placeId: '',
    fromLocation: '',
    fromLocation_placeId: '',
    carrierMaxWeight: null,
    arrivalDate: undefined as unknown as Date,
    rewardAmount: null,
};

const userCurrency = {
    [Currency.RUB]: 'RUB',
    [Currency.EUR]: 'EUR',
    [Currency.USD]: 'USD',
};

const CarrierAddingPopup: React.FC<IProps> = ({ togglePopup, reload }) => {
    const closePopup = () => {
        formik.setValues(defaultValues);
        togglePopup(prev => !prev);
    };

    const { t } = useTranslation();

    const { triggerOpen } = useContext(OpenAlertContext);

    const { currency } = useAppSelector(
        ({ settings }) => settings.generalSettings
    );

    const addNewOrder = async (form: ICreateOrderCarrier) => {
        const data = await addOrderAsACarrier(form);

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('orderSuccessAdd'),
            });
            await reload();
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorAddOrder'),
            });
        }
    };

    const addOrderFunc = async (
        form: ICreateOrderCarrier,
        { resetForm }: { resetForm: () => void }
    ) => {
        await addNewOrder(form);
        resetForm();
        formik.setSubmitting(false);
        closePopup();
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: addOrderFunc,
        validationSchema: CarrierPopupSchema,
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
        <Popup title={'Send new item'} closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2} width='100%'>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='fromLocation'>
                                {t('deliverFrom')}
                            </label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value: formik.values.fromLocation,
                                    onChange: formik.handleChange,
                                    error:
                                        formik.errors.fromLocation !==
                                        undefined,
                                    helperText:
                                        formik.errors.fromLocation &&
                                        (t(
                                            formik.errors.fromLocation
                                        ) as string),
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='toLocation'>{t('deliverTo')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'toLocation',
                                    name: 'toLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value: formik.values.toLocation,
                                    onChange: formik.handleChange,
                                    error:
                                        formik.errors.toLocation !== undefined,
                                    helperText:
                                        formik.errors.toLocation &&
                                        (t(formik.errors.toLocation) as string),
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='rewardAmount'>
                                {t('productPrice')}
                            </label>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <span className={styles.currency}>
                                                {t(userCurrency[currency])}
                                            </span>
                                        </InputAdornment>
                                    ),
                                }}
                                id='rewardAmount'
                                name='rewardAmount'
                                type='number'
                                placeholder='0'
                                variant='outlined'
                                value={formik.values.rewardAmount}
                                onChange={formik.handleChange}
                                error={formik.errors.rewardAmount !== undefined}
                                helperText={
                                    formik.errors.rewardAmount &&
                                    (t(formik.errors.rewardAmount) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='arrivalDate'>
                                {t('arrivalDate')}
                            </label>
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
                                        id='dateOfBirth'
                                        name='dateOfBirth'
                                        variant='outlined'
                                        className={styles.input}
                                        error={
                                            formik.errors.arrivalDate !==
                                            undefined
                                        }
                                        helperText={
                                            formik.errors.arrivalDate &&
                                            t('correctDate')
                                        }
                                    />
                                )}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='carrierMaxWeight'>
                                {t('maxWeight')}
                            </label>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {t('kg')}
                                        </InputAdornment>
                                    ),
                                }}
                                id='carrierMaxWeight'
                                name='carrierMaxWeight'
                                placeholder={t('maxWeight') as string}
                                variant='outlined'
                                type='number'
                                value={formik.values.carrierMaxWeight}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.carrierMaxWeight !== undefined
                                }
                                helperText={
                                    formik.errors.carrierMaxWeight &&
                                    (t(
                                        formik.errors.carrierMaxWeight
                                    ) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Button
                        variant='contained'
                        className={styles.confirmButton}
                        type='submit'
                        disabled={formik.isSubmitting}
                    >
                        {t('createOrder')}
                    </Button>
                </Stack>
            </form>
        </Popup>
    );
};

export default CarrierAddingPopup;
