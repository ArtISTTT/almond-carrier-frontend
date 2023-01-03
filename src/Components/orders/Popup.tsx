import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React from 'react';
import { useFormik } from 'formik';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/system';
import { IOrder } from '../../interfaces/profile';
import { PopupSchema } from '../../schemas/PopupSchema';

const valutes = ['Rubles', 'Euro', 'Dollar'];

const deliverPlaces = ['Russia', 'Antalya'];

interface IProps {
    addNewOrder: (form: IOrder) => void;
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<IProps> = ({ togglePopup, addNewOrder }) => {
    const closePopup = () => {
        formik.setValues({
            to: 'Russia',
            currency: 'Rubles',
            reward: '',
            item: '',
            suggestedBenefit: '',
            weight: '',
            description: '',
        });
        togglePopup(prev => !prev);
    };

    const addOrderFunc = (
        form: IOrder,
        { resetForm }: { resetForm: () => void }
    ) => {
        addNewOrder(form);
        resetForm();
        formik.setSubmitting(false);
        closePopup();
    };

    const formik = useFormik({
        initialValues: {
            // id: Math.floor(Math.random() * 1000),
            to: 'Russia',
            currency: 'Rubles',
            reward: '',
            item: '',
            suggestedBenefit: '',
            weight: '',
            description: '',
        },
        onSubmit: addOrderFunc,
        validationSchema: PopupSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <div className={styles.popup}>
            <div onClick={closePopup} className={styles.icon}>
                <HighlightOffIcon />
            </div>
            <Typography
                className={styles.popupTitle}
                variant='h3'
                component='h3'
            >
                Create order
            </Typography>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={3} width='100%'>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='to'>Deliver to</label>
                            <Select
                                id='to'
                                name='to'
                                value={formik.values.to}
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
                            <label htmlFor='item'>Short name</label>
                            <TextField
                                id='item'
                                name='item'
                                placeholder='Short name'
                                variant='outlined'
                                value={formik.values.item}
                                onChange={formik.handleChange}
                                error={formik.errors.item !== undefined}
                                helperText={formik.errors.item}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='currency'>Currency</label>
                            <Select
                                id='currency'
                                name='currency'
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {valutes.map((valute, i) => (
                                    <MenuItem key={i} value={valute}>
                                        {valute}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='suggestedBenefit'>
                                Suggested Benefit
                            </label>
                            <TextField
                                id='suggestedBenefit'
                                name='suggestedBenefit'
                                placeholder='0'
                                variant='outlined'
                                value={formik.values.suggestedBenefit}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.suggestedBenefit !== undefined
                                }
                                helperText={formik.errors.suggestedBenefit}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='reward'>Reward</label>
                            <TextField
                                id='reward'
                                name='reward'
                                placeholder='0'
                                variant='outlined'
                                value={formik.values.reward}
                                onChange={formik.handleChange}
                                error={formik.errors.reward !== undefined}
                                helperText={formik.errors.reward}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='weight'>Weight</label>
                            <TextField
                                id='weight'
                                name='weight'
                                placeholder='Weight'
                                variant='outlined'
                                value={formik.values.weight}
                                onChange={formik.handleChange}
                                error={formik.errors.weight !== undefined}
                                helperText={formik.errors.weight}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='description'>Description</label>
                            <TextField
                                id='description'
                                name='description'
                                placeholder='Some words about order...'
                                variant='outlined'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.errors.description !== undefined}
                                helperText={formik.errors.description}
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
        </div>
    );
};

export default Popup;
