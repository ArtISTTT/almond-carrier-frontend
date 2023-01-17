import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder, IOrderFull } from '../../interfaces/order';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { OrderStatus } from '../../interfaces/profile';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import OrderInputItem, {
    ChangedType,
    ILabels,
    ViewType,
    getChangedType,
} from './OrderInputItem';
import { calculateTotalAmount } from '../../helpers/calculateTotalAmount';
import { Currency } from '../../interfaces/settings';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import cn from 'classnames';
import {
    agreeWithChanges,
    confirmDeal,
    disagreeWithChanges,
    suggestChangesByCarrier,
    suggestChangesByReceiver,
} from 'src/api/order';
import { useContext } from 'react';
import { OpenAlertContext } from '../Layouts/Snackbar';

type IProps = {
    order: IOrderFull;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const OrderInformation: React.FC<IProps> = ({ order, updateOrder }) => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const [editingFields, setEditingFields] = useState<(keyof IOrderFull)[]>(
        []
    );
    const { triggerOpen } = useContext(OpenAlertContext);
    const viewType = useMemo(
        () =>
            order.receiver?.id === user.id
                ? ViewType.receiver
                : ViewType.carrier,
        []
    );
    const suggestedChanged =
        viewType === ViewType.receiver
            ? order.byCarrierSuggestedChanges
            : order.byReceiverSuggestedChanges;
    const hasByYouSuggestedChanged = Boolean(
        viewType === ViewType.receiver
            ? order.byReceiverSuggestedChanges
            : order.byCarrierSuggestedChanges
    );

    const addToEditingFields = (name: keyof IOrderFull) => {
        setEditingFields(editingFields.concat([name]));
    };

    const removeFromEditingFields = async (name: keyof IOrderFull) => {
        const newArr = editingFields.filter(value => value !== name);
        setEditingFields(newArr);
        await formik.setFieldValue(name, (initialValues as any)[name]);
    };

    const availableLabels = useMemo(() => {
        const labels: ILabels = {};

        if (
            suggestedChanged ||
            hasByYouSuggestedChanged ||
            (order.dealConfirmedByCarrier && viewType === ViewType.carrier) ||
            (order.dealConfirmedByReceiver && viewType === ViewType.receiver)
        ) {
            return labels;
        }

        if (user.id === order.receiver?.id) {
            if (order.status === OrderStatus.waitingCarrier) {
                labels.productName = true;
                labels.fromLocation = true;
                labels.toLocation = true;
                labels.productAmount = true;
                labels.rewardAmount = true;
                labels.productWeight = true;
                labels.productDescription = true;
            } else if (order.status === OrderStatus.inDiscussion) {
                labels.productAmount = true;
                labels.rewardAmount = true;
                labels.productWeight = true;
                labels.productDescription = true;
            }
        } else {
            if (order.status === OrderStatus.waitingReciever) {
                labels.fromLocation = true;
                labels.toLocation = true;
                labels.rewardAmount = true;
                labels.carrierMaxWeight = true;
                labels.arrivalDate = true;
            } else if (order.status === OrderStatus.inDiscussion) {
                labels.rewardAmount = true;
            }
        }

        return labels;
    }, [order]);

    const onSubmit = (form: any) => {
        setEditingFields([]);
    };

    const initialValues = useMemo(() => {
        return {
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
            ...(order.byCarrierSuggestedChanges ?? {}),
            ...(order.byReceiverSuggestedChanges ?? {}),
        };
    }, [order]);

    const suggestChanges = async (form: typeof initialValues) => {
        const method =
            user.id === order.receiver?.id
                ? suggestChangesByReceiver
                : suggestChangesByCarrier;

        const asArray = Object.entries(form);

        const filtered = asArray.filter(
            ([key, value]) => value !== (initialValues as any)[key]
        );

        const data = await method({
            changes: Object.fromEntries(filtered),
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Successfully changed',
            });
            setEditingFields([]);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error while changing data',
            });
        }

        formik.setSubmitting(false);

        await updateOrder(true);
    };

    const agreeWithChangesClick = async () => {
        const data = await agreeWithChanges({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Successfully changed',
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error while changing data',
            });
        }

        formik.setSubmitting(false);

        await updateOrder(true);
    };

    const disagreeWithChangesClick = async () => {
        const data = await agreeWithChanges({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Successfully rejected',
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error while rejecting changes',
            });
        }

        formik.setSubmitting(false);

        await updateOrder(true);
    };

    const confirmDealClick = async () => {
        const data = await confirmDeal({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Successfully confirmed',
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error as string,
            });
        }

        formik.setSubmitting(false);

        await updateOrder(true);
    };

    const formik = useFormik({
        initialValues,
        onSubmit: suggestChanges,
    });

    const hasAnyChanges = useMemo(() => {
        return JSON.stringify(formik.values) !== JSON.stringify(initialValues);
    }, [initialValues, formik.values]);

    const descriptionChangedType = getChangedType(
        order,
        viewType,
        'productDescription'
    );

    return (
        <>
            {order.status === OrderStatus.inDiscussion && (
                <>
                    {suggestedChanged && (
                        <div className={styles.byOther}>
                            Highlighted fields have been changed and are waiting
                            for your confirmation
                        </div>
                    )}
                    {hasByYouSuggestedChanged && (
                        <div className={styles.byYou}>
                            Highlighted fields have been changed by you and are
                            waiting for confirmation
                        </div>
                    )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                Waiting for confirmation of the carrier
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                Waiting for confirmation of the receiver
                            </div>
                        )}
                    {viewType === ViewType.receiver &&
                        order.dealConfirmedByCarrier &&
                        !order.dealConfirmedByReceiver && (
                            <div className={styles.confirmationString}>
                                The carrier is waiting for your confirmation to
                                start the deal
                            </div>
                        )}
                    {viewType === ViewType.carrier &&
                        order.dealConfirmedByReceiver &&
                        !order.dealConfirmedByCarrier && (
                            <div className={styles.confirmationString}>
                                The receiver is waiting for your confirmation to
                                start the deal
                            </div>
                        )}
                </>
            )}

            {order.status === OrderStatus.waitingForPaymentVerification && (
                <div className={styles.confirmationString}>
                    Waiting for payment confirmation
                </div>
            )}
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
                                    viewType={viewType}
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
                                        viewType={viewType}
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
                                        viewType={viewType}
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
                                        viewType={viewType}
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
                                        viewType={viewType}
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
                                        viewType={viewType}
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
                                                className={
                                                    styles.orderInputValue
                                                }
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
                                        viewType={viewType}
                                    />
                                )}
                                {!order.productWeight &&
                                    order.carrierMaxWeight && (
                                        <OrderInputItem
                                            formik={formik}
                                            editingFields={editingFields}
                                            order={order}
                                            id='carrierMaxWeight'
                                            type='number'
                                            placeholder='Max weight'
                                            label='Max weight'
                                            availableLabels={availableLabels}
                                            addToEditingFields={
                                                addToEditingFields
                                            }
                                            removeFromEditingFields={
                                                removeFromEditingFields
                                            }
                                            viewType={viewType}
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
                                        className={cn(styles.multiline, {
                                            [styles.green]:
                                                descriptionChangedType ===
                                                ChangedType.byOther,
                                            [styles.orange]:
                                                descriptionChangedType ===
                                                ChangedType.byMe,
                                        })}
                                    />
                                    {availableLabels.productDescription &&
                                        descriptionChangedType ===
                                            ChangedType.notChanged &&
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
                    {((!order.dealConfirmedByReceiver &&
                        viewType === ViewType.receiver) ||
                        (!order.dealConfirmedByCarrier &&
                            viewType === ViewType.carrier)) &&
                        order.byCarrierSuggestedChanges === undefined &&
                        order.byReceiverSuggestedChanges === undefined && (
                            <>
                                <div className={styles.buttons}>
                                    <Button
                                        className={styles.buttonItem}
                                        variant='contained'
                                        color='primary'
                                        disabled={!hasAnyChanges}
                                        type='submit'
                                    >
                                        Confirm changes
                                    </Button>
                                </div>
                                <div className={styles.buttons}>
                                    <Button
                                        className={styles.buttonItem}
                                        variant='contained'
                                        color='primary'
                                        onClick={confirmDealClick}
                                    >
                                        Start the deal
                                    </Button>
                                </div>
                            </>
                        )}
                    {suggestedChanged && (
                        <div className={styles.buttons}>
                            <Button
                                className={styles.buttonItem}
                                variant='contained'
                                color='success'
                                onClick={agreeWithChangesClick}
                            >
                                Agree with changes
                            </Button>
                            <Button
                                className={styles.buttonItem}
                                variant='contained'
                                color='error'
                                onClick={disagreeWithChangesClick}
                            >
                                Reject changes
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default OrderInformation;
