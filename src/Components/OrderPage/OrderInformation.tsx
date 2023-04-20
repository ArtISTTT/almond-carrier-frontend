import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField, Tooltip } from '@mui/material';
import cn from 'classnames';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    agreeWithChanges,
    confirmDeal,
    disagreeWithChanges,
    suggestChangesByCarrier,
    suggestChangesByReceiver,
} from 'src/api/order';
import { calculateComission } from 'src/helpers/calculateComission';
import { Banks, IUser } from 'src/interfaces/user';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';
import { ReceiverPopupSchema } from 'src/schemas/PopupSchema';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder, IOrderFull } from '../../interfaces/order';
import { OrderStatus } from '../../interfaces/profile';
import { Currency } from '../../interfaces/settings';
import { OpenAlertContext } from '../Layouts/Snackbar';
import OrderConfirmationCarrier from './OrderConfirmationCarrier';
import OrderConfirmationReceiver from './OrderConfirmationReceiver';
import OrderInputItem, {
    ChangedType,
    getChangedType,
    ILabels,
    ViewType,
} from './OrderInputItem';
import OrderPayment from './OrderPayment';
import OrderPaymentSuccess from './OrderPaymentSuccess';
import OrderPayoutInfoBlock from './OrderPayoutInfoBlock';
import OrderReview from './OrderReview';
import ProcuctPurchaseByCodeConfirmation from './ProcuctPurchaseByCodeConfirmation';
import ReviewPopup from './ReviewPopup';

type IProps = {
    order: IOrderFull;
    payoutRef: React.MutableRefObject<HTMLDivElement | null>;
    viewType: ViewType;
    suggestedChanged: Partial<IOrder> | undefined;
    hasByYouSuggestedChanged: boolean;
    isReviewBlockOpen: boolean;
    isMySentReviewBlockOpen: boolean;
    isPersonReviewBlockOpen: boolean;
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMySentReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPersonReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser;
    updateOrder: (withoutLoading?: true) => Promise<void>;
};

const allowedStatusesForPurchaseReceiver = [
    OrderStatus.awaitingRecieverItemBeforePurchasePhotosConfirmation,
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingPayout,
    OrderStatus.awaitingPurchase,
    OrderStatus.success,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
];

const allowedStatusesForPurchaseCarrier = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingDelivery,
    OrderStatus.awaitingRecieverItemBeforePurchasePhotosConfirmation,
    OrderStatus.awaitingPayout,
    OrderStatus.awaitingPurchase,
    OrderStatus.awaitingBeforePurchaseItemsFiles,
    OrderStatus.success,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
];

const allowedStatusesForReview = [
    OrderStatus.itemRecieved,
    OrderStatus.awaitingPayout,
    OrderStatus.awaitingRecieverItemPurchasePhotosConfirmation,
    OrderStatus.success,
];

const OrderInformation: React.FC<IProps> = ({
    order,
    viewType,
    user,
    updateOrder,
    payoutRef,
    suggestedChanged,
    hasByYouSuggestedChanged,
    isReviewBlockOpen,
    isMySentReviewBlockOpen,
    isPersonReviewBlockOpen,
    setIsReviewBlockOpen,
    setIsMySentReviewBlockOpen,
    setIsPersonReviewBlockOpen,
}) => {
    const [editingFields, setEditingFields] = useState<(keyof IOrderFull)[]>(
        []
    );

    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const formatAmount = useFormatAmount();
    const { userBank } = useGetBanks({
        bank: order?.payoutInfo?.bank || Banks.SBER,
    });

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
                labels.productUri = true;
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
            toLocationBounds: null,
            fromLocationBounds: null,
            toLocation: order.toLocation,
            toLocation_placeId: order.toLocation_placeId,
            fromLocation: order.fromLocation,
            fromLocation_placeId: order.fromLocation_placeId,
            productName: order.productName,
            productUri: order.productUri,
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

        const filtered = asArray.filter(([key, value]) => {
            if (key === 'arrivalDate') {
                return (
                    initialValues.arrivalDate &&
                    !initialValues.arrivalDate.isSame(value as Dayjs)
                );
            }

            return value !== (initialValues as any)[key];
        });

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
        const data = await disagreeWithChanges({
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
        validationSchema: ReceiverPopupSchema,
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

        return `${order.receiver?.firstName} ${order.receiver?.lastName}`;
    }, [
        viewType,
        order.receiver?.firstName,
        order.receiver?.lastName,
        order.carrier?.lastName,
        order.carrier?.firstName,
    ]);

    const myFullName = useMemo(() => {
        if (viewType === ViewType.receiver) {
            return `${order.receiver?.firstName} ${order.receiver?.lastName}`;
        }

        return `${order.carrier?.firstName} ${order.carrier?.lastName}`;
    }, [
        viewType,
        order.receiver?.firstName,
        order.receiver?.lastName,
        order.carrier?.lastName,
        order.carrier?.firstName,
    ]);

    const userCurrency = useAppSelector(
        ({ settings }) => settings.generalSettings.currency
    );

    return (
        <>
            {order.myReview &&
                isMySentReviewBlockOpen &&
                !isPersonReviewBlockOpen && (
                    <ReviewPopup
                        closeReviewPopup={setIsMySentReviewBlockOpen}
                        fullName={myFullName}
                        rating={order.myReview.rating}
                        reviewText={order.myReview.text}
                        reviewerType={order.myReview.reviewerType}
                    />
                )}
            {order.partnerReview &&
                isPersonReviewBlockOpen &&
                !isMySentReviewBlockOpen && (
                    <ReviewPopup
                        closeReviewPopup={setIsPersonReviewBlockOpen}
                        fullName={personFullName}
                        rating={order.partnerReview.rating}
                        reviewText={order.partnerReview.text}
                        reviewerType={order.partnerReview.reviewerType}
                    />
                )}

            <div className={styles.orderInformation}>
                <div className={styles.orderInformationTitle}>
                    {t('orderInformation')}
                </div>

                {order.status === OrderStatus.itemRecieved &&
                    viewType === ViewType.carrier && (
                        <OrderPaymentSuccess order={order} />
                    )}

                <div ref={payoutRef}>
                    <OrderPayment order={order} updateOrder={updateOrder} />
                </div>

                {allowedStatusesForPurchaseReceiver.includes(order.status) &&
                    viewType === ViewType.receiver && (
                        <OrderConfirmationReceiver
                            orderId={order.id}
                            orderStatus={order.status}
                            fileLinks={order.purchaseItemFiles}
                            beforePurchasingItemFiles={
                                order.beforePurchaseItemFiles
                            }
                        />
                    )}

                {allowedStatusesForPurchaseCarrier.includes(order.status) &&
                    viewType === ViewType.carrier && (
                        <OrderConfirmationCarrier
                            orderId={order.id}
                            orderStatus={order.status}
                            fileLinks={order.purchaseItemFiles}
                            beforePurchasingItemFiles={
                                order.beforePurchaseItemFiles
                            }
                        />
                    )}

                {order.status === OrderStatus.awaitingDelivery &&
                    viewType === ViewType.receiver && (
                        <ProcuctPurchaseByCodeConfirmation
                            formik={formik}
                            updateOrder={updateOrder}
                            orderId={order.id}
                        />
                    )}

                <OrderPayoutInfoBlock
                    status={order.status}
                    viewType={viewType}
                    order={order}
                />

                {!order.myReview &&
                isReviewBlockOpen &&
                allowedStatusesForReview.includes(order.status) ? (
                    <OrderReview
                        setIsReviewBlockOpen={setIsReviewBlockOpen}
                        orderId={order.id}
                        personFullName={personFullName}
                        userForId={
                            viewType === ViewType.receiver
                                ? (order.carrier?.id as string)
                                : (order.receiver?.id as string)
                        }
                        reviewerType={viewType}
                    />
                ) : (
                    <form
                        className={styles.form}
                        onSubmit={formik.handleSubmit}
                    >
                        {((viewType === ViewType.carrier && order.receiver) ||
                            (viewType === ViewType.receiver &&
                                order.carrier)) && (
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
                        )}
                        <div className={styles.editableForm}>
                            {order.productName && (
                                <Tooltip
                                    placement='right'
                                    title={order.productName}
                                >
                                    <div className={styles.productName}>
                                        <OrderInputItem
                                            formik={formik}
                                            editingFields={editingFields}
                                            order={order}
                                            id='productName'
                                            label={t('productName') as string}
                                            type='string'
                                            placeholder={
                                                t('productName') as string
                                            }
                                            availableLabels={availableLabels}
                                            addToEditingFields={
                                                addToEditingFields
                                            }
                                            removeFromEditingFields={
                                                removeFromEditingFields
                                            }
                                            viewType={viewType}
                                        />
                                    </div>
                                </Tooltip>
                            )}
                            {order.productUri && (
                                <Tooltip
                                    placement='right'
                                    title={order.productUri}
                                >
                                    <div className={styles.productName}>
                                        <OrderInputItem
                                            formik={formik}
                                            editingFields={editingFields}
                                            order={order}
                                            id='productUri'
                                            label={t('productUri') as string}
                                            type='string'
                                            placeholder={
                                                t('productUri') as string
                                            }
                                            availableLabels={availableLabels}
                                            addToEditingFields={
                                                addToEditingFields
                                            }
                                            removeFromEditingFields={
                                                removeFromEditingFields
                                            }
                                            viewType={viewType}
                                        />
                                    </div>
                                </Tooltip>
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
                                            addToEditingFields={
                                                addToEditingFields
                                            }
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
                                            addToEditingFields={
                                                addToEditingFields
                                            }
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
                                            placeholder={
                                                t('arrivalDate') as string
                                            }
                                            label={t('arrivalDate') as string}
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
                                <div className={styles.column}>
                                    {order.productAmount !== undefined && (
                                        <OrderInputItem
                                            formatAmount={formatAmount}
                                            unit={userCurrency}
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
                                            addToEditingFields={
                                                addToEditingFields
                                            }
                                            removeFromEditingFields={
                                                removeFromEditingFields
                                            }
                                            viewType={viewType}
                                        />
                                    )}
                                    {order.rewardAmount && (
                                        <OrderInputItem
                                            formatAmount={formatAmount}
                                            unit={userCurrency}
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
                                            addToEditingFields={
                                                addToEditingFields
                                            }
                                            removeFromEditingFields={
                                                removeFromEditingFields
                                            }
                                            viewType={viewType}
                                        />
                                    )}
                                    {order.rewardAmount !== undefined &&
                                        order.totalPaymentAmount !==
                                            undefined &&
                                        order.productAmount !== undefined && (
                                            <div className={styles.inputItem}>
                                                <label>
                                                    {t('totalAmount')}
                                                </label>
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
                                                        {viewType ===
                                                        ViewType.receiver
                                                            ? order.totalPaymentAmount &&
                                                              formatAmount(
                                                                  order.totalPaymentAmount,
                                                                  Currency.RUB
                                                              )
                                                            : formatAmount(
                                                                  order.productAmount +
                                                                      order.rewardAmount,
                                                                  Currency.RUB
                                                              )}{' '}
                                                        {t(Currency.RUB)}
                                                        {viewType ===
                                                            ViewType.receiver && (
                                                            <span
                                                                className={
                                                                    styles.comission
                                                                }
                                                            >
                                                                {' '}
                                                                (
                                                                {order.totalPaymentAmount &&
                                                                    formatAmount(
                                                                        calculateComission(
                                                                            order.totalPaymentAmount,
                                                                            order.productAmount,
                                                                            order.rewardAmount
                                                                        ),
                                                                        Currency.RUB
                                                                    )}{' '}
                                                                {t('RUB')}{' '}
                                                                {t('comission')}
                                                                )
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div className={styles.column}>
                                    {order.productWeight && (
                                        <OrderInputItem
                                            unit={'kg'}
                                            formik={formik}
                                            editingFields={editingFields}
                                            order={order}
                                            id='productWeight'
                                            placeholder={t('weight') as string}
                                            label={t('weight') as string}
                                            type='number'
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
                                    {!order.productWeight &&
                                        order.carrierMaxWeight && (
                                            <OrderInputItem
                                                unit={'kg'}
                                                formik={formik}
                                                editingFields={editingFields}
                                                order={order}
                                                id='carrierMaxWeight'
                                                type='number'
                                                placeholder={
                                                    t('maxWeight') as string
                                                }
                                                label={t('maxWeight') as string}
                                                availableLabels={
                                                    availableLabels
                                                }
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
                                            placeholder={
                                                t('description') as string
                                            }
                                            minRows={4}
                                            maxRows={4}
                                            disabled={
                                                !editingFields.includes(
                                                    'productDescription'
                                                )
                                            }
                                            value={
                                                formik.values.productDescription
                                            }
                                            onChange={formik.handleChange}
                                            error={
                                                formik.errors
                                                    .productDescription !==
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

                        {(!order.dealConfirmedByReceiver ||
                            (!order.dealConfirmedByCarrier &&
                                viewType === ViewType.carrier)) &&
                            order.byCarrierSuggestedChanges === undefined &&
                            order.byReceiverSuggestedChanges === undefined &&
                            order.status !== OrderStatus.waitingCarrier &&
                            order.status !== OrderStatus.waitingReciever && (
                                <>
                                    <div className={styles.buttons}>
                                        <Button
                                            className={styles.buttonItem}
                                            variant='contained'
                                            color='primary'
                                            disabled={
                                                !hasAnyChanges ||
                                                order.status ===
                                                    OrderStatus.cancelled
                                            }
                                            type='submit'
                                        >
                                            {t('confirmChanges')}
                                        </Button>
                                    </div>
                                    {((viewType === ViewType.carrier &&
                                        order.receiver) ||
                                        order.carrier) && (
                                        <div className={styles.buttons}>
                                            <Button
                                                disabled={
                                                    order.status ===
                                                        OrderStatus.cancelled ||
                                                    (order.dealConfirmedByCarrier &&
                                                        viewType ===
                                                            ViewType.carrier) ||
                                                    (order.dealConfirmedByReceiver &&
                                                        viewType ===
                                                            ViewType.receiver)
                                                }
                                                className={styles.buttonItem}
                                                variant='contained'
                                                color='primary'
                                                onClick={confirmDealClick}
                                            >
                                                {t('startTheDeal')}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                    </form>
                )}

                {suggestedChanged && (
                    <div className={styles.buttons}>
                        <Button
                            className={styles.buttonItem}
                            variant='contained'
                            color='success'
                            onClick={agreeWithChangesClick}
                        >
                            {t('agreeWithChanges')}
                        </Button>
                        <Button
                            className={styles.buttonItem}
                            variant='contained'
                            color='error'
                            onClick={disagreeWithChangesClick}
                        >
                            {t('rejectChanges')}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderInformation;
