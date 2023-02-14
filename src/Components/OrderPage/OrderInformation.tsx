import React, { useMemo, useState } from 'react';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder, IOrderFull } from '../../interfaces/order';
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
    completeOrder,
    confirmDeal,
    suggestChangesByCarrier,
    suggestChangesByReceiver,
} from 'src/api/order';
import { useContext } from 'react';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { IUser } from 'src/interfaces/user';
import { useTranslation } from 'react-i18next';
import OrderReview from './OrderReview';

type IProps = {
    order: IOrderFull;
    viewType: ViewType;
    suggestedChanged: Partial<IOrder> | undefined;
    hasByYouSuggestedChanged: boolean;
    isReviewBlockOpen: boolean;
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const OrderInformation: React.FC<IProps> = ({
    order,
    viewType,
    suggestedChanged,
    hasByYouSuggestedChanged,
    isReviewBlockOpen,
    setIsReviewBlockOpen,
    user,
    updateOrder,
}) => {
    const [editingFields, setEditingFields] = useState<(keyof IOrderFull)[]>(
        []
    );

    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

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
                text: t('successfullyChanged'),
            });
            setEditingFields([]);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorWhileChangingData'),
            });
        }

        formik.setSubmitting(false);
    };

    const agreeWithChangesClick = async () => {
        const data = await agreeWithChanges({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('successfullyChanged'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorWhileChangingData'),
            });
        }

        formik.setSubmitting(false);
    };

    const disagreeWithChangesClick = async () => {
        const data = await agreeWithChanges({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('successfullyRejected'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorWhileRejectingChanges'),
            });
        }

        formik.setSubmitting(false);
    };

    const completeOrderClick = async () => {
        const data = await completeOrder({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('successfullyConfirmed'),
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

    const confirmDealClick = async () => {
        const data = await confirmDeal({
            orderId: order.id,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('successfullyConfirmed'),
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

    const personFullName = useMemo(() => {
        if (viewType === ViewType.receiver) {
            return `${order.carrier?.firstName} ${order.carrier?.lastName}`;
        }

        if (viewType === ViewType.carrier) {
            return `${order.receiver?.firstName} ${order.receiver?.lastName}`;
        }
    }, [
        viewType,
        order.receiver?.firstName,
        order.receiver?.lastName,
        order.carrier?.lastName,
        order.carrier?.firstName,
    ]);

    return (
        <div className={styles.orderInformation}>
            {!isReviewBlockOpen ? (
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.orderInformationTitle}>
                        {t('orderInformation')}
                    </div>
                    <div className={styles.personInfo}>
                        <div className={styles.personRole}>
                            {viewType === ViewType.carrier
                                ? t('receiver')
                                : t('carrier')}
                        </div>
                        <div className={styles.personName}>
                            {personFullName}
                        </div>
                    </div>
                    <div className={styles.editableForm}>
                        {order.productName && (
                            <div className={styles.productName}>
                                <OrderInputItem
                                    formik={formik}
                                    editingFields={editingFields}
                                    order={order}
                                    id='productName'
                                    label={t('productName') as string}
                                    type='string'
                                    placeholder={t('productName') as string}
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
                                        placeholder={t('from') as string}
                                        label={t('from') as string}
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
                                        placeholder={t('to') as string}
                                        label={t('to') as string}
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
                                        placeholder={t('arrivalDate') as string}
                                        label={t('arrivalDate') as string}
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
                                        placeholder={
                                            t('productAmount') as string
                                        }
                                        label={t('productAmount') as string}
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
                                        placeholder={
                                            t('rewardAmount') as string
                                        }
                                        label={t('rewardAmount') as string}
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
                                        <label>{t('totalAmount')}</label>
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
                                        placeholder={t('weight') as string}
                                        label={t('weight') as string}
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
                                            placeholder={
                                                t('maxWeight') as string
                                            }
                                            label={t('maxWeight') as string}
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
                                    {t('description')}
                                </label>
                                <div className={styles.editingWrapper}>
                                    <TextField
                                        id='productDescription'
                                        name='productDescription'
                                        variant='outlined'
                                        type='string'
                                        multiline
                                        placeholder={t('description') as string}
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
                                        {t('confirmChanges')}
                                    </Button>
                                </div>
                                <div className={styles.buttons}>
                                    <Button
                                        className={styles.buttonItem}
                                        variant='contained'
                                        color='primary'
                                        onClick={confirmDealClick}
                                    >
                                        {t('startTheDeal')}
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
                                {t('AgreeWithChanges')}
                            </Button>
                            <Button
                                className={styles.buttonItem}
                                variant='contained'
                                color='error'
                                onClick={disagreeWithChangesClick}
                            >
                                {t('RejectChanges')}
                            </Button>
                        </div>
                    )}
                    {viewType === ViewType.receiver &&
                        order.status === OrderStatus.awaitingDelivery && (
                            <div className={styles.buttons}>
                                <Button
                                    className={styles.buttonItem}
                                    variant='contained'
                                    color='success'
                                    onClick={completeOrderClick}
                                >
                                    Товар получен
                                </Button>
                            </div>
                        )}
                </form>
            ) : (
                <OrderReview setIsReviewBlockOpen={setIsReviewBlockOpen} />
            )}
        </div>
    );
};

export default OrderInformation;
