import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React from 'react';
import { useFormik } from 'formik';
import { Stack } from '@mui/system';
import { ReceiverPopupSchema } from '../../schemas/PopupSchema';
import Popup from './Popup';
import { ICreateOrderReciever } from '../../interfaces/order';

const valutes = ['RUB', 'USD', 'EUR'];

const deliverPlaces = ['Russia', 'Antalya'];

interface IProps {
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => Promise<void>;
}

const defaultValues = {
    fromLocation: undefined,
    toLocation: '',
    productName: '',
    rewardAmount: 2000,
    productAmount: 0,
    productWeight: 0,
    productDescription: '',
};

const ReceiverAddingPopup: React.FC<IProps> = ({ togglePopup, reload }) => {
    const closePopup = () => {
        formik.setValues(defaultValues);
        togglePopup(prev => !prev);
    };

    const addNewOrder = (form: ICreateOrderReciever) => {
        console.log(form);
    };

    const addOrderFunc = (
        form: ICreateOrderReciever,
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
        validationSchema: ReceiverPopupSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <Popup closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2} width='100%'>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='fromLocation'>Deliver from</label>
                            <Select
                                id='fromLocation'
                                name='fromLocation'
                                value={formik.values.fromLocation}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {deliverPlaces.map((place, i) => (
                                    <MenuItem key={i} value={place}>
                                        {place}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='toLocation'>Deliver to</label>
                            <Select
                                id='toLocation'
                                name='toLocation'
                                value={formik.values.toLocation}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {deliverPlaces.map((place, i) => (
                                    <MenuItem key={i} value={place}>
                                        {place}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='productName'>Short name</label>
                            <TextField
                                id='productName'
                                name='productName'
                                placeholder='Short name'
                                variant='outlined'
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                error={formik.errors.productName !== undefined}
                                helperText={formik.errors.productName}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='productWeight'>Weight</label>
                            <TextField
                                id='productWeight'
                                name='productWeight'
                                placeholder='Weight'
                                variant='outlined'
                                type='number'
                                value={formik.values.productWeight}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.productWeight !== undefined
                                }
                                helperText={formik.errors.productWeight}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='productAmount'>Product price</label>
                            <TextField
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
                                helperText={formik.errors.productAmount}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='rewardAmount'>
                                Suggested Benefit
                            </label>
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
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='productDescription'>
                                Description
                            </label>
                            <TextField
                                id='productDescription'
                                name='productDescription'
                                placeholder='Some words about order...'
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
                                helperText={formik.errors.productDescription}
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

export default ReceiverAddingPopup;
