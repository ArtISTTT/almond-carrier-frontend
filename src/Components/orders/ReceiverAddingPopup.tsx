import {
    Button,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
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

const valutes = ['RUB', 'USD', 'EUR'];

const deliverPlaces = ['Russia', 'Antalya'];

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
    rewardAmount: 2000,
    productAmount: 0,
    productWeight: 0,
    productDescription: '',
};

const ReceiverAddingPopup: React.FC<IProps> = ({ togglePopup, reload }) => {
    const { triggerOpen } = useContext(OpenAlertContext);
    const closePopup = () => {
        formik.setValues(defaultValues);
        togglePopup(prev => !prev);
    };

    const addNewOrder = async (form: ICreateOrderReciever) => {
        const data = await addOrderAsAReceiver(form);

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
        <Popup title={'Order new item'} closePopup={closePopup}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2} width='100%'>
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='fromLocation'>
                                Deliver from<span>(Not required)</span>
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            KG
                                        </InputAdornment>
                                    ),
                                }}
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            RUB
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
                                helperText={formik.errors.productAmount}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='rewardAmount'>
                                Suggested Benefit
                            </label>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            RUB
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
