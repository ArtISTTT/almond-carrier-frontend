import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder } from '../../interfaces/order';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { orderStatus } from '../../interfaces/profile';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import OrderInputItem, { ILabels } from './OrderInputItem';
import { calculateTotalAmount } from '../../helpers/calculateTotalAmount';
import { Currency } from '../../interfaces/settings';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import cn from 'classnames';

type IProps = {
    order: IOrder;
};

const OrderInformation: React.FC<IProps> = ({ order }) => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const [editingFields, setEditingFields] = useState<(keyof IOrder)[]>([]);

    const addToEditingFields = (name: keyof IOrder) => {
        setEditingFields(editingFields.concat([name]));
    };

    const removeFromEditingFields = async (name: keyof IOrder) => {
        const newArr = editingFields.filter(value => value !== name);
        setEditingFields(newArr);
        await formik.setFieldValue(name, order[name]);
    };

    const availableLabels = useMemo(() => {
        const labels: ILabels = {};

        if (user.id === order.receiver?.id) {
            if (order.status === orderStatus.waitingCarrier) {
                labels.productName = true;
                labels.fromLocation = true;
                labels.toLocation = true;
                labels.productAmount = true;
                labels.rewardAmount = true;
                labels.productWeight = true;
                labels.productDescription = true;
            } else if (order.status === orderStatus.inDiscussion) {
                labels.productAmount = true;
                labels.rewardAmount = true;
                labels.productWeight = true;
                labels.productDescription = true;
            }
        } else {
            if (order.status === orderStatus.waitingReciever) {
                labels.fromLocation = true;
                labels.toLocation = true;
                labels.rewardAmount = true;
                labels.carrierMaxWeight = true;
                labels.arrivalDate = true;
            } else if (order.status === orderStatus.inDiscussion) {
                labels.rewardAmount = true;
            }
        }

        return labels;
    }, [order]);

    const onSubmit = (form: any) => {
        console.log(form);
        setEditingFields([]);
    };

    const formik = useFormik({
        initialValues: {
            toLocation: order.toLocation,
            toLocation_placeId: order.toLocation_placeId,
            fromLocation: order.fromLocation,
            fromLocation_placeId: order.fromLocation_placeId,
            productName: order.productName,
            rewardAmount: order.rewardAmount,
            productAmount: order.productAmount,
            productWeight: order.productWeight,
            productDescription: order.productDescription,
            carrierMaxWeight: order.carrierMaxWeight,
            arrivalDate: order.arrivalDate,
        },
        onSubmit,
    });

    return (
        <div className={styles.orderInformation}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.orderInformationTitle}>
                    Order information
                </div>
                <div className={styles.editableForm}>
                    {order.productName && (
                        <div className={styles.productName}>
                            <OrderInputItem
                                formik={formik}
                                editingFields={editingFields}
                                order={order}
                                id='productName'
                                label='Product name'
                                type='string'
                                placeholder='Product name'
                                availableLabels={availableLabels}
                                addToEditingFields={addToEditingFields}
                                removeFromEditingFields={
                                    removeFromEditingFields
                                }
                            />
                        </div>
                    )}
                    <div className={styles.valuesByColumns}>
                        <div className={styles.column}>
                            {order.fromLocation && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='fromLocation'
                                    type='string'
                                    isLocation={true}
                                    placeholder='Product name'
                                    label='From location'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                            {order.toLocation && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='toLocation'
                                    type='string'
                                    isLocation={true}
                                    placeholder='To location'
                                    label='To location'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                            {order.arrivalDate && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='arrivalDate'
                                    type='date'
                                    placeholder='Arrival date'
                                    label='Arrival date'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                        </div>
                        <div className={styles.column}>
                            {order.productAmount && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='productAmount'
                                    type='number'
                                    placeholder='Product amount'
                                    label='Product amount'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                            {order.rewardAmount && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='rewardAmount'
                                    type='number'
                                    placeholder='Reward amount'
                                    label='Reward amount'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                            {order.rewardAmount && order.productAmount && (
                                <div className={styles.inputItem}>
                                    <label>Total amount</label>
                                    <div
                                        className={
                                            styles.orderInputValueWrapper
                                        }
                                    >
                                        <span
                                            className={styles.orderInputValue}
                                        >
                                            {calculateTotalAmount(
                                                order.productAmount,
                                                order.rewardAmount,
                                                Currency.RUB
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.column}>
                            {order.productWeight && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='productWeight'
                                    placeholder='Product weight'
                                    label='Product weight'
                                    type='number'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                            {!order.productWeight && order.carrierMaxWeight && (
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='carrierMaxWeight'
                                    type='number'
                                    placeholder='Max weight'
                                    label='Max weight'
                                    availableLabels={availableLabels}
                                    addToEditingFields={addToEditingFields}
                                    removeFromEditingFields={
                                        removeFromEditingFields
                                    }
                                />
                            )}
                        </div>
                    </div>
                    {order.productDescription && (
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.multilineItem
                            )}
                        >
                            <label htmlFor='productDescription'>
                                Description
                            </label>
                            <div className={styles.editingWrapper}>
                                <TextField
                                    id='productDescription'
                                    name='productDescription'
                                    variant='outlined'
                                    type='string'
                                    multiline
                                    minRows={4}
                                    maxRows={4}
                                    disabled={
                                        !editingFields.includes(
                                            'productDescription'
                                        )
                                    }
                                    value={formik.values.productDescription}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.errors.productDescription !==
                                        undefined
                                    }
                                    helperText={
                                        formik.errors.productDescription
                                    }
                                    className={styles.multiline}
                                />
                                {availableLabels.productDescription &&
                                    (editingFields.includes(
                                        'productDescription'
                                    ) ? (
                                        <CloseIcon
                                            fontSize='medium'
                                            onClick={() =>
                                                removeFromEditingFields(
                                                    'productDescription'
                                                )
                                            }
                                        />
                                    ) : (
                                        <EditIcon
                                            fontSize='medium'
                                            onClick={() =>
                                                addToEditingFields(
                                                    'productDescription'
                                                )
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OrderInformation;
