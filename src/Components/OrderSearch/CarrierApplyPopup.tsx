import { Avatar, Button, Typography, TextField, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';

interface IProps {
    closePopup: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
}

const CarrierApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
    const ApplyCarrierFunc = () => {
        closePopup(false);
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
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        To: <span>{order.toLocation}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        From: <span>{order.fromLocation}</span>
                    </Typography>
                    <Typography
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        flight date:
                        <span>
                            {dayjs(order.arrivalDate as Date).format(
                                'YYYY.MM.DD'
                            )}
                        </span>
                    </Typography>
                </Stack>
                <Stack direction='column' spacing={3}>
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
            <Stack direction='row' spacing={3}>
                <div className={styles.inputItem}>
                    <label htmlFor='productName'>name</label>
                    <TextField
                        id='productName'
                        name='productName'
                        placeholder='Name'
                        variant='outlined'
                        // value={formik.values.productName}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productName !== undefined}
                        // helperText={formik.errors.productName}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor='productName'>PRICE</label>
                    <TextField
                        id='productName'
                        name='productName'
                        placeholder='Price'
                        variant='outlined'
                        type='number'
                        // value={formik.values.productName}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productName !== undefined}
                        // helperText={formik.errors.productName}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputItem}>
                    <label htmlFor='productWeight'>weight</label>
                    <TextField
                        id='productWeight'
                        name='productWeight'
                        placeholder='Weight'
                        variant='outlined'
                        type='number'
                        // value={formik.values.productWeight}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productWeight !== undefined}
                        // helperText={formik.errors.productWeight}
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
                    placeholder='Description...'
                    multiline
                    maxRows={4}
                    className={styles.carrierDescriptionBody}
                />
            </div>
            <Button
                onClick={ApplyCarrierFunc}
                className={styles.carrierApplyButton}
                variant='contained'
            >
                apply for order
            </Button>
        </ApplyPopup>
    );
};

export default CarrierApplyPopup;
