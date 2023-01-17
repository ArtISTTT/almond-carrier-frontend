import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import cn from 'classnames';
import LoopIcon from '@mui/icons-material/Loop';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { useTranslation } from 'next-i18next';

type IProps = {
    updateByFiltersAndType: (
        data: carriersFilter | receiversFilter
    ) => Promise<void>;
    type: OrderSeachType;
};

const SearchFilters: React.FC<IProps> = ({ updateByFiltersAndType, type }) => {
    const { t } = useTranslation();
    const carriersFormik = useFormik({
        initialValues: {
            fromLocation: undefined,
            fromLocation_placeId: undefined,
            toLocation: undefined,
            maxBenefit: undefined,
            maxWeight: undefined,
        },
        onSubmit: updateByFiltersAndType,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const receiversFormik = useFormik({
        initialValues: {
            fromLocation: undefined,
            fromLocation_placeId: undefined,
            toLocation: undefined,
            maxPrice: undefined,
            minBenefit: undefined,
            maxWeight: undefined,
        },
        onSubmit: updateByFiltersAndType,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const refresh = async () => {
        if (type === OrderSeachType.carriers) {
            await updateByFiltersAndType(carriersFormik.values);
        } else {
            await updateByFiltersAndType(receiversFormik.values);
        }
    };

    const setLocationValueReceivers = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        await receiversFormik.setFieldValue(id, value);
        await receiversFormik.setFieldValue(id + '_placeId', placeId);
    };
    const setLocationValueCarriers = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string
    ) => {
        await carriersFormik.setFieldValue(id, value);
        await carriersFormik.setFieldValue(id + '_placeId', placeId);
    };

    return (
        <div className={styles.filtersWrapper}>
            {type === OrderSeachType.carriers && (
                <form onSubmit={carriersFormik.handleSubmit}>
                    <div className={styles.formR}>
                        <div className={styles.formFirstR}>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.longInput
                                )}
                            >
                                <label htmlFor='fromLocation'>
                                    {t('from')}
                                </label>
                                <RegionAutocomplete
                                    textFieldProps={{
                                        id: 'fromLocation',
                                        name: 'fromLocation',
                                        type: 'string',
                                        variant: 'outlined',
                                        value: carriersFormik.values
                                            .fromLocation,
                                        onChange: carriersFormik.handleChange,
                                        error:
                                            carriersFormik.errors
                                                .fromLocation !== undefined,
                                        helperText:
                                            carriersFormik.errors
                                                .fromLocation &&
                                            (t(
                                                carriersFormik.errors
                                                    .fromLocation
                                            ) as string),
                                        className: styles.input,
                                    }}
                                    setValue={setLocationValueCarriers}
                                />
                            </div>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.longInput
                                )}
                            >
                                <label htmlFor='toLocation'>{t('to')}</label>
                                <RegionAutocomplete
                                    textFieldProps={{
                                        id: 'toLocation',
                                        name: 'toLocation',
                                        type: 'string',
                                        variant: 'outlined',
                                        value: carriersFormik.values.toLocation,
                                        onChange: carriersFormik.handleChange,
                                        error:
                                            carriersFormik.errors.toLocation !==
                                            undefined,
                                        helperText:
                                            carriersFormik.errors.toLocation &&
                                            (t(
                                                carriersFormik.errors.toLocation
                                            ) as string),
                                        className: styles.input,
                                    }}
                                    setValue={setLocationValueCarriers}
                                />
                            </div>
                        </div>
                        <div className={styles.formSecondC}>
                            <div className={styles.inputItem}>
                                <label htmlFor='maxWeight'>
                                    {t('maxWeight')}
                                </label>
                                <TextField
                                    id='maxWeight'
                                    name='maxWeight'
                                    type='number'
                                    variant='outlined'
                                    value={carriersFormik.values.maxWeight}
                                    onChange={carriersFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputItem}>
                                <label htmlFor='maxBenefit'>
                                    {t('maxBenefit')}
                                </label>
                                <TextField
                                    id='maxBenefit'
                                    name='maxBenefit'
                                    variant='outlined'
                                    type='number'
                                    value={carriersFormik.values.maxBenefit}
                                    onChange={carriersFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
            {type === OrderSeachType.receivers && (
                <form onSubmit={receiversFormik.handleSubmit}>
                    <div className={styles.formR}>
                        <div className={styles.formFirstR}>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.longInput
                                )}
                            >
                                <label htmlFor='fromLocation'>
                                    {t('from')}
                                </label>
                                <RegionAutocomplete
                                    textFieldProps={{
                                        id: 'fromLocation',
                                        name: 'fromLocation',
                                        type: 'string',
                                        variant: 'outlined',
                                        value: receiversFormik.values
                                            .fromLocation,
                                        onChange: receiversFormik.handleChange,
                                        error:
                                            receiversFormik.errors
                                                .fromLocation !== undefined,
                                        helperText:
                                            receiversFormik.errors
                                                .fromLocation &&
                                            (t(
                                                receiversFormik.errors
                                                    .fromLocation
                                            ) as string),
                                        className: styles.input,
                                    }}
                                    setValue={setLocationValueReceivers}
                                />
                            </div>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.longInput
                                )}
                            >
                                <label htmlFor='toLocation'>{t('to')}</label>
                                <RegionAutocomplete
                                    textFieldProps={{
                                        id: 'toLocation',
                                        name: 'toLocation',
                                        type: 'string',
                                        variant: 'outlined',
                                        value: receiversFormik.values
                                            .toLocation,
                                        onChange: receiversFormik.handleChange,
                                        error:
                                            receiversFormik.errors
                                                .toLocation !== undefined,
                                        helperText:
                                            receiversFormik.errors.toLocation &&
                                            (t(
                                                receiversFormik.errors
                                                    .toLocation
                                            ) as string),
                                        className: styles.input,
                                    }}
                                    setValue={setLocationValueReceivers}
                                />
                            </div>
                        </div>
                        <div className={styles.formSecondR}>
                            <div className={styles.formSecondDistrR}>
                                <div className={styles.inputItem}>
                                    <label htmlFor='maxPrice'>
                                        {t('maxPrice')}
                                    </label>
                                    <TextField
                                        id='maxPrice'
                                        name='maxPrice'
                                        type='number'
                                        variant='outlined'
                                        value={receiversFormik.values.maxPrice}
                                        onChange={receiversFormik.handleChange}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputItem}>
                                    <label htmlFor='maxWeight'>
                                        {t('maxWeight')}
                                    </label>
                                    <TextField
                                        id='maxWeight'
                                        name='maxWeight'
                                        type='number'
                                        variant='outlined'
                                        value={receiversFormik.values.maxWeight}
                                        onChange={receiversFormik.handleChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputItem}>
                                <label htmlFor='minBenefit'>
                                    {t('minBenefit')}
                                </label>
                                <TextField
                                    id='minBenefit'
                                    name='minBenefit'
                                    variant='outlined'
                                    type='number'
                                    value={receiversFormik.values.minBenefit}
                                    onChange={receiversFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
            <Button
                variant='contained'
                className={styles.refreshButton}
                onClick={refresh}
            >
                <LoopIcon fontSize='small' />
                {t('refresh')}
            </Button>
        </div>
    );
};

export default SearchFilters;
