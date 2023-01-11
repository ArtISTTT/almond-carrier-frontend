import {
    Avatar,
    Button,
    Typography,
    TextField,
    Stack,
    InputAdornment,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';
import { useRouter } from 'next/router';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { applyOrderAsReceiver } from '../../api/order';

interface IProps {
    closePopup: () => void;
    order: IOrder;
}
interface IForm {
    productName: string;
    productAmount: number | undefined;
    productWeight: number | undefined;
    productDescription: string;
}

const defaultValues = {
    productName: '',
    productAmount: undefined,
    productWeight: undefined,
    productDescription: '',
};

const CarrierApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
    const { push } = useRouter();
    const { triggerOpen } = useContext(OpenAlertContext);

    const apply = async (form: IForm) => {
        const data = await applyOrderAsReceiver({ ...form, orderId: order.id });

        if (data.ok && data.orderId) {
            triggerOpen({
                severity: 'success',
                text: 'You have successfully responded to the order.',
            });
            push(`/order/${data.orderId}`);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to apply to an order',
            });
            formik.setSubmitting(false);
        }
        closePopup();
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: apply,
    });

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
                        {order.carrier?.firstName} {order.carrier?.lastName}
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
            <div className={styles.carrierInfo}>
                <Stack direction='column' spacing={3}>
                    <Typography
                        className={styles.infoItemWay}
                        variant='h5'
                        component='p'
                    >
                        To: <span>{order.toLocation}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItemWay}
                        variant='h5'
                        component='p'
                    >
                        From: <span>{order.fromLocation}</span>
                    </Typography>
                </Stack>
                <Stack direction='column' spacing={3}>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        flight date:
                        <span>
                            {dayjs(order.arrivalDate as Date).format(
                                'DD.MM.YYYY'
                            )}
                        </span>
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
                        Max weight: <span>{order.carrierMaxWeight}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        Total sum to be paid: <span>??</span>
                    </Typography>
                </Stack>
            </div>
            <form onSubmit={formik.handleSubmit} action='submit'>
                <Stack direction='row' spacing={3}>
                    <div className={styles.inputItem}>
                        <label htmlFor='productName'>name</label>
                        <TextField
                            id='productName'
                            name='productName'
                            variant='outlined'
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor='productAmount'>PRICE</label>
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
                            variant='outlined'
                            type='number'
                            value={formik.values.productAmount}
                            onChange={formik.handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <label htmlFor='productWeight'>weight</label>
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
                            variant='outlined'
                            type='number'
                            value={formik.values.productWeight}
                            onChange={formik.handleChange}
                            className={styles.input}
                        />
                    </div>
                </Stack>
                <div className={styles.carrierDescription}>
                    <Typography
                        className={styles.carrierDescriptionTitle}
                        variant='h6'
                        component='h4'
                    >
                        Description:
                    </Typography>
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

export default CarrierApplyPopup;
