import { Button, InputAdornment, TextField } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Stack } from '@mui/system';
import { ReceiverPopupSchema } from '../../schemas/PopupSchema';
import Popup from './Popup';
import { ICreateOrderReciever } from '../../interfaces/order';
import { addOrderAsAReceiver } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { useTranslation } from 'react-i18next';

interface IProps {
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => Promise<void>;
}

const defaultValues = {
    fromLocation: undefined,
    fromLocation_placeId: undefined,
    toLocation: '',
    toLocation_placeId: '',
    productName: '',
    rewardAmount: null,
    productAmount: null,
    productWeight: null,
    productDescription: '',
};

const ReceiverAddingPopup: React.FC<IProps> = ({ togglePopup, reload }) => {
    const { triggerOpen } = useContext(OpenAlertContext);
    const closePopup = () => {
        formik.setValues(defaultValues);
        togglePopup(prev => !prev);
    };
    const { t } = useTranslation();

    const addNewOrder = async (form: ICreateOrderReciever) => {
        const data = await addOrderAsAReceiver(form);

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
        form: ICreateOrderReciever,
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
        validationSchema: ReceiverPopupSchema,
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
        <Popup title={'Order new item'} closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2} width='100%'>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='fromLocation'>
                                {t('deliverFrom')}
                                <span>({t('notRequired')})</span>
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
                            <label htmlFor='productName'>
                                {t('productName')}
                            </label>
                            <TextField
                                id='productName'
                                name='productName'
                                placeholder={t('productName') as string}
                                variant='outlined'
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                error={formik.errors.productName !== undefined}
                                helperText={
                                    formik.errors.productName &&
                                    (t(formik.errors.productName) as string)
                                }
                                className={styles.input}
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
                                placeholder={t('weight') as string}
                                variant='outlined'
                                type='number'
                                value={formik.values.productWeight}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.productWeight !== undefined
                                }
                                helperText={
                                    formik.errors.productWeight &&
                                    (t(formik.errors.productWeight) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='productAmount'>
                                {t('productPrice')}
                            </label>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {t('rub')}
                                        </InputAdornment>
                                    ),
                                }}
                                id='productAmount'
                                name='productAmount'
                                placeholder='0'
                                variant='outlined'
                                type='number'
                                value={formik.values.productAmount}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.productAmount !== undefined
                                }
                                helperText={
                                    formik.errors.productAmount &&
                                    (t(formik.errors.productAmount) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='rewardAmount'>
                                {t('suggestedBenefit')}
                            </label>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {t('rub')}
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
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='productDescription'>
                                {t('description')}
                            </label>
                            <TextField
                                id='productDescription'
                                name='productDescription'
                                placeholder={
                                    t('someWordsAboutOrders') as string
                                }
                                variant='outlined'
                                multiline
                                minRows={4}
                                maxRows={4}
                                value={formik.values.productDescription}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.productDescription !==
                                    undefined
                                }
                                helperText={
                                    formik.errors.productDescription &&
                                    (t(
                                        formik.errors.productDescription
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

export default ReceiverAddingPopup;
