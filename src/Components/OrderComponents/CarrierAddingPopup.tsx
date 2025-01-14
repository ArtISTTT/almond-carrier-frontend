import { Button, InputAdornment, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IBounds } from 'src/interfaces/geometry';
import { Currency } from 'src/interfaces/settings';
import { useAppSelector } from 'src/redux/hooks';
import styles from '../../../styles/Popup.module.css';
import { addOrderAsACarrier } from '../../api/order';
import { ICreateOrderCarrier } from '../../interfaces/order';
import { CarrierPopupSchema } from '../../schemas/PopupSchema';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { OpenAlertContext } from '../Layouts/Snackbar';
import Popup from './Popup';

interface IProps {
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => Promise<void>;
}

const defaultValues = {
    toLocation: '',
    toLocation_placeId: '',
    toLocationBounds: {},
    fromLocation: '',
    fromLocation_placeId: '',
    fromLocationBounds: {},
    carrierMaxWeight: null,
    arrivalDate: new Date(),
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
        placeId: string,
        bounds: IBounds
    ) => {
        await formik.setFieldValue(id, value);
        await formik.setFieldValue(id + '_placeId', placeId);
        await formik.setFieldValue(id + 'Bounds', bounds);
    };

    return (
        <Popup title={t('sendNewItem') as string} closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack
                    className={styles.inputsWrapper}
                    direction='column'
                    spacing={1.5}
                    width='100%'
                >
                    <div className={styles.inputItem}>
                        <label htmlFor='fromLocation'>{t('deliverFrom')}</label>
                        <RegionAutocomplete
                            textFieldProps={{
                                id: 'fromLocation',
                                name: 'fromLocation',
                                type: 'string',
                                variant: 'outlined',
                                placeholder: t('enterLocation') as string,
                                value: formik.values.fromLocation,
                                onChange: formik.handleChange,
                                error: formik.errors.fromLocation !== undefined,
                                helperText:
                                    formik.errors.fromLocation &&
                                    (t(formik.errors.fromLocation) as string),
                                className: styles.input,
                            }}
                            setValue={setLocationValue}
                        />
                    </div>
                    <div className={cn(styles.inputItem)}>
                        <label htmlFor='toLocation'>{t('deliverTo')}</label>
                        <RegionAutocomplete
                            textFieldProps={{
                                id: 'toLocation',
                                name: 'toLocation',
                                type: 'string',
                                variant: 'outlined',
                                placeholder: t('enterLocation') as string,
                                value: formik.values.toLocation,
                                onChange: formik.handleChange,
                                error: formik.errors.toLocation !== undefined,
                                helperText:
                                    formik.errors.toLocation &&
                                    (t(formik.errors.toLocation) as string),
                                className: styles.input,
                            }}
                            setValue={setLocationValue}
                        />
                    </div>

                    <div className={styles.inputItem}>
                        <label htmlFor='rewardAmount'>{t('reward')}</label>
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
                    <div className={cn(styles.inputItem)}>
                        <label htmlFor='arrivalDate'>{t('arrivalDate')}</label>
                        <DesktopDatePicker
                            inputFormat='DD.MM.YYYY'
                            value={formik.values.arrivalDate}
                            maxDate={dayjs().month(dayjs().month() + 1)}
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
                                    className={styles.input}
                                    error={
                                        formik.errors.arrivalDate !== undefined
                                    }
                                    helperText={
                                        formik.errors.arrivalDate &&
                                        t('correctDate')
                                    }
                                />
                            )}
                        />
                    </div>
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
                            error={formik.errors.carrierMaxWeight !== undefined}
                            helperText={
                                formik.errors.carrierMaxWeight &&
                                (t(formik.errors.carrierMaxWeight) as string)
                            }
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.alignCenter}>
                        <motion.div
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.93 }}
                        >
                            <Button
                                variant='contained'
                                className={styles.confirmButton}
                                type='submit'
                                disabled={formik.isSubmitting}
                            >
                                {t('sendItem')}
                            </Button>
                        </motion.div>
                    </div>
                </Stack>
            </form>
        </Popup>
    );
};

export default CarrierAddingPopup;
