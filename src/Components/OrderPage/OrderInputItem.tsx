import { TextField } from '@mui/material';
import React, { useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../../styles/OrderPage.module.css';
import { IOrder } from '../../interfaces/order';
import dayjs from 'dayjs';
import RegionAutocomplete from '../Common/RegionAutocomplete';

export type ILabels = {
    [key in keyof IOrder]?: boolean;
};

type OrderWithoutUsers = Omit<IOrder, 'receiver' | 'carrier'>;

type IProps = {
    formik: any;
    editingFields: (keyof IOrder)[];
    order: OrderWithoutUsers;
    id: keyof OrderWithoutUsers;
    label?: string;
    type: string;
    placeholder: string;
    availableLabels: ILabels;
    isLocation?: true;
    addToEditingFields: (name: keyof IOrder) => void;
    removeFromEditingFields: (name: keyof IOrder) => void;
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
    addToEditingFields,
    removeFromEditingFields,
}) => {
    const orderValue = useMemo(() => order[id], [order, id]);

    const setLocationValue = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        await formik.setFieldValue(id, value);
        await formik.setFieldValue(id + '_placeId', placeId);
    };

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
                    <span className={styles.orderInputValue}>
                        {orderValue instanceof Date
                            ? dayjs(orderValue).format('DD.MM.YYYY')
                            : orderValue}
                    </span>
                    {availableLabels[id] && (
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
