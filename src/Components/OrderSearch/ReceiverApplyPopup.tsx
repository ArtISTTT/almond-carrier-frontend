import { Avatar, Button, Typography, TextField, Stack } from '@mui/material';
import React from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';
import cn from 'classnames';
import { useFormik } from 'formik';
import RegionAutocomplete from '../Common/RegionAutocomplete';

interface IProps {
    closePopup: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
}
interface IForm {
    fromLocation?: string;
    date: Date;
    fromLocation_placeId: string;
    Description: string;
}

const defaultValues = {
    fromLocation: '',
    fromLocation_placeId: '',
    date: new Date(),
    Description: '',
};

const ReceiverApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
    const ApplyCarrierFunc = (form: IForm) => {
        closePopup(false);
        console.log(form);
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: ApplyCarrierFunc,
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
                        Rating: <span>5</span>
                    </Typography>
                    <Typography
                        className={styles.carrierCompletedOrders}
                        variant='h4'
                        component='h3'
                    >
                        Completed orders: <span>4</span>
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
                        To: <span>{order.toLocation}</span>
                    </Typography>
                    {order.fromLocation && (
                        <Typography
                            className={styles.infoItemWay}
                            variant='h5'
                            component='p'
                        >
                            From: <span>{order.fromLocation}</span>
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
                        price:
                        <span>{order.productAmount}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        benefit: <span>{order.rewardAmount}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        weight
                        <span>{order.productWeight}</span>
                    </Typography>
                </Stack>
            </div>
            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack direction='row' spacing={2}>
                    {!order.fromLocation && (
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='fromLocation'>From</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value: formik.values.fromLocation,
                                    onChange: formik.handleChange,
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        </div>
                    )}
                    <div className={styles.inputItem}>
                        <label htmlFor='productName'>Date</label>
                        <TextField
                            id='date'
                            name='date'
                            type='date'
                            variant='outlined'
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            className={cn(styles.onlyDateInput, {
                                [styles.input]: order.fromLocation,
                            })}
                        />
                    </div>
                </Stack>
                <div className={styles.carrierDescription}>
                    <Typography
                        className={styles.carrierDescriptionTitle}
                        variant='h6'
                        component='h4'
                    >
                        Description
                    </Typography>
                    <TextField
                        id='Description'
                        name='Description'
                        placeholder='Some words about order...'
                        variant='outlined'
                        multiline
                        minRows={4}
                        maxRows={4}
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        className={styles.carrierDescriptionBody}
                    />
                </div>
                <Button
                    type='submit'
                    className={styles.carrierApplyButton}
                    variant='contained'
                >
                    apply for order
                </Button>
            </form>
        </ApplyPopup>
    );
};

export default ReceiverApplyPopup;
