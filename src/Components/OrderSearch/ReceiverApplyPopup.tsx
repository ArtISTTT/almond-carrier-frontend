import { Avatar, Button, Typography, TextField, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import styles from '../../../styles/ApplyPopup.module.css';
import { IOrder } from '../../interfaces/order';
import ApplyPopup from './ApplyPopup';
import cn from 'classnames';

interface IProps {
    closePopup: React.Dispatch<React.SetStateAction<boolean>>;
    order: IOrder;
}

const ReceiverApplyPopup: React.FC<IProps> = ({ closePopup, order }) => {
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
                        className={styles.infoItem}
                        variant='h5'
                        component='p'
                    >
                        To: <span>{order.toLocation}</span>
                    </Typography>
                    {order.fromLocation && (
                        <Typography
                            className={styles.infoItem}
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
                        <span>
                            {dayjs(order.arrivalDate as Date).format(
                                'YYYY.MM.DD'
                            )}
                        </span>
                    </Typography>
                </Stack>
            </div>
            <Stack direction='row' spacing={2}>
                {!order.fromLocation && (
                    <div className={styles.inputItem}>
                        <label htmlFor='productName'>From</label>
                        <TextField
                            id='from'
                            name='from'
                            variant='outlined'
                            // value={formik.values.productName}
                            // onChange={formik.handleChange}
                            // error={formik.errors.productName !== undefined}
                            // helperText={formik.errors.productName}
                            className={styles.input}
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
                        // value={formik.values.productName}
                        // onChange={formik.handleChange}
                        // error={formik.errors.productName !== undefined}
                        // helperText={formik.errors.productName}
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
                    Description:
                </Typography>
                <TextField
                    id='Description'
                    name='Description'
                    placeholder='Some words about order...'
                    variant='outlined'
                    multiline
                    minRows={4}
                    maxRows={4}
                    // value={formik.values.productDescription}
                    // onChange={formik.handleChange}
                    // error={formik.errors.productDescription !== undefined}
                    // helperText={formik.errors.productDescription}
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

export default ReceiverApplyPopup;
