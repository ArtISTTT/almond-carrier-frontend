import { Button, MenuItem, Select, TextField } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Stack } from '@mui/system';
import { CarrierPopupSchema } from '../../schemas/PopupSchema';
import Popup from './Popup';
import { ICreateOrderCarrier } from '../../interfaces/order';
import { addOrderAsACarrier } from '../../api/order';
import { OpenAlertContext } from '../Layouts/Snackbar';
import RegionAutocomplete from '../Common/RegionAutocomplete';

const valutes = ['Rubles', 'Euro', 'Dollar'];

const deliverPlaces = ['Russia', 'Antalya'];

interface IProps {
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => Promise<void>;
}

const defaultValues = {
    toLocation: '',
    toLocation_placeId: '',
    fromLocation: '',
    fromLocation_placeId: '',
    carrierMaxWeight: 0,
    arrivalDate: undefined as unknown as Date,
    rewardAmount: 2000,
};

const CarrierAddingPopup: React.FC<IProps> = ({ togglePopup, reload }) => {
    const closePopup = () => {
        formik.setValues(defaultValues);
        togglePopup(prev => !prev);
    };

    const { triggerOpen } = useContext(OpenAlertContext);

    const addNewOrder = async (form: ICreateOrderCarrier) => {
        const data = await addOrderAsACarrier(form);

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Order successfully added',
            });
            await reload();
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to add an order',
            });
        }
    };

    const addOrderFunc = (
        form: ICreateOrderCarrier,
        { resetForm }: { resetForm: () => void }
    ) => {
        addNewOrder(form);
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

    const setLocationValue = (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        formik.setValues({
            ...formik.values,
            [id]: value,
            [id + '_placeId']: placeId,
        });
    };

    return (
        <Popup closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2} width='100%'>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='fromLocation'>Deliver from</label>
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
                                    helperText: formik.errors.fromLocation,
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='toLocation'>Deliver to</label>
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
                                    helperText: formik.errors.toLocation,
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='rewardAmount'>Benefit</label>
                            <TextField
                                id='rewardAmount'
                                name='rewardAmount'
                                type='number'
                                placeholder='0'
                                variant='outlined'
                                value={formik.values.rewardAmount}
                                onChange={formik.handleChange}
                                error={formik.errors.rewardAmount !== undefined}
                                helperText={formik.errors.rewardAmount}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='arrivalDate'>Arrival date</label>
                            <TextField
                                id='arrivalDate'
                                name='arrivalDate'
                                placeholder='Arrival date'
                                type='date'
                                variant='outlined'
                                value={formik.values.arrivalDate}
                                onChange={formik.handleChange}
                                error={formik.errors.arrivalDate !== undefined}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='carrierMaxWeight'>Max weight</label>
                            <TextField
                                id='carrierMaxWeight'
                                name='carrierMaxWeight'
                                placeholder='Max weight'
                                variant='outlined'
                                type='number'
                                value={formik.values.carrierMaxWeight}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.carrierMaxWeight !== undefined
                                }
                                helperText={formik.errors.carrierMaxWeight}
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
                        Create Order
                    </Button>
                </Stack>
            </form>
        </Popup>
    );
};

export default CarrierAddingPopup;
