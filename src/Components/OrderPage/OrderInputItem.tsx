import { TextField } from '@mui/material';
import React, { useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../../styles/OrderPage.module.css';
import { IOrderFull } from '../../interfaces/order';
import dayjs, { Dayjs } from 'dayjs';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import cn from 'classnames';

export type ILabels = {
    [key in keyof IOrderFull]?: boolean;
};

type OrderWithoutUsers = Omit<IOrderFull, 'receiver' | 'carrier'>;

export enum ViewType {
    carrier = 'carrier',
    receiver = 'receiver',
}

export enum ChangedType {
    byMe = 'byMe',
    byOther = 'byOther',
    notChanged = 'notChanged',
}

export const getChangedType = (
    order: IOrderFull,
    viewType: ViewType,
    id: string
) => {
    if (
        viewType === ViewType.carrier &&
        (order.byReceiverSuggestedChanges as any)?.[id] !== undefined
    ) {
        return ChangedType.byOther;
    }

    if (
        viewType === ViewType.receiver &&
        (order.byCarrierSuggestedChanges as any)?.[id] !== undefined
    ) {
        return ChangedType.byOther;
    }

    if (
        viewType === ViewType.carrier &&
        (order.byCarrierSuggestedChanges as any)?.[id] !== undefined
    ) {
        return ChangedType.byMe;
    }

    if (
        viewType === ViewType.receiver &&
        (order.byReceiverSuggestedChanges as any)?.[id] !== undefined
    ) {
        return ChangedType.byMe;
    }

    return ChangedType.notChanged;
};

type IProps = {
    formik: any;
    editingFields: (keyof IOrderFull)[];
    order: OrderWithoutUsers;
    id: keyof OrderWithoutUsers;
    label?: string;
    type: string;
    placeholder: string;
    availableLabels: ILabels;
    isLocation?: true;
    viewType: ViewType;
    addToEditingFields: (name: keyof IOrderFull) => void;
    removeFromEditingFields: (name: keyof IOrderFull) => void;
};

const OrderInputItem: React.FC<IProps> = ({
    formik,
    editingFields,
    order,
    id,
    label,
    type,
    isLocation,
    availableLabels,
    placeholder,
    viewType,
    addToEditingFields,
    removeFromEditingFields,
}) => {
    const setLocationValue = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        await formik.setFieldValue(id, value);
        await formik.setFieldValue(id + '_placeId', placeId);
    };

    const changedType = useMemo(
        () => getChangedType(order, viewType, id),
        [order, viewType, id]
    );

    return (
        <div className={styles.inputItem}>
            {label && <label htmlFor={id}>{label}</label>}
            {editingFields.includes(id) ? (
                <>
                    <div className={styles.editingWrapper}>
                        {isLocation ? (
                            <RegionAutocomplete
                                textFieldProps={{
                                    id,
                                    name: id,
                                    type: 'string',
                                    variant: 'outlined',
                                    value: formik.values[id],
                                    onChange: formik.handleChange,
                                    error: formik.errors[id] !== undefined,
                                    helperText: formik.errors[id],
                                    className: styles.input,
                                }}
                                setValue={setLocationValue}
                            />
                        ) : (
                            <TextField
                                id={id}
                                name={id}
                                placeholder={placeholder}
                                variant='outlined'
                                type={type}
                                value={formik.values[id]}
                                onChange={formik.handleChange}
                                error={formik.errors[id] !== undefined}
                                helperText={formik.errors[id]}
                                className={styles.input}
                            />
                        )}
                        <CloseIcon
                            fontSize='medium'
                            onClick={() => removeFromEditingFields(id)}
                        />
                    </div>
                </>
            ) : (
                <div className={styles.orderInputValueWrapper}>
                    <span
                        className={cn(styles.orderInputValue, {
                            [styles.green]: changedType === ChangedType.byOther,
                            [styles.orange]: changedType === ChangedType.byMe,
                        })}
                    >
                        {id === 'arrivalDate'
                            ? dayjs(formik.values[id]).format('DD.MM.YYYY')
                            : formik.values[id]}
                    </span>
                    {availableLabels[id] &&
                        changedType === ChangedType.notChanged && (
                            <EditIcon
                                fontSize='medium'
                                onClick={() => addToEditingFields(id)}
                            />
                        )}
                </div>
            )}
        </div>
    );
};

export default OrderInputItem;
