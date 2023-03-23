import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import { useFormik } from 'formik';
import { Button, TextField, InputAdornment } from '@mui/material';
import cn from 'classnames';
import LoopIcon from '@mui/icons-material/Loop';
import RegionAutocomplete from '../Common/RegionAutocomplete';
import { useTranslation } from 'next-i18next';
import { Currency } from 'src/interfaces/settings';
import { useAppSelector } from 'src/redux/hooks';
import { IBounds } from 'src/interfaces/geometry';
import DeleteIcon from '@mui/icons-material/Delete';
import {motion} from "framer-motion"

type IProps = {
    updateByFiltersAndType: (
        data: carriersFilter | receiversFilter
    ) => Promise<void>;
    type: OrderSeachType;
};

const userCurrency = {
    [Currency.RUB]: 'RUB',
    [Currency.EUR]: 'EUR',
    [Currency.USD]: 'USD',
};

const carriersInitialValues = {
    fromLocation: undefined,
    fromLocation_placeId: undefined,
    fromLocationBounds: undefined,
    toLocation: undefined,
    toLocation_placeId: undefined,
    toLocationBounds: undefined,
    maxBenefit: undefined,
    maxWeight: undefined,
};

const recieversInitialValues = {
    fromLocation: undefined,
    fromLocation_placeId: undefined,
    fromLocationBounds: undefined,
    toLocation: undefined,
    toLocation_placeId: undefined,
    toLocationBounds: undefined,
    maxPrice: undefined,
    minBenefit: undefined,
    maxWeight: undefined,
};

const SearchFilters: React.FC<IProps> = ({ updateByFiltersAndType, type }) => {
    const { t } = useTranslation();

    const { currency } = useAppSelector(
        ({ settings }) => settings.generalSettings
    );

    const carriersFormik = useFormik({
        initialValues: carriersInitialValues,
        onSubmit: updateByFiltersAndType,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const receiversFormik = useFormik({
        initialValues: recieversInitialValues,
        onSubmit: updateByFiltersAndType,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const refresh = async (
        forceData?: typeof carriersFormik.values | typeof receiversFormik.values
    ) => {
        if (type === OrderSeachType.carriers) {
            await updateByFiltersAndType(forceData ?? carriersFormik.values);
        } else {
            await updateByFiltersAndType(forceData ?? receiversFormik.values);
        }
    };

    const onRefreshClick = async () => {
        await refresh();
    };

    const reset = async () => {
        carriersFormik.resetForm();
        receiversFormik.resetForm();

        await refresh({} as typeof carriersFormik.values);
    };

    const setLocationValueReceivers = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string,
        bounds: IBounds
    ) => {
        await receiversFormik.setFieldValue(id, value);
        await receiversFormik.setFieldValue(id + '_placeId', placeId);
        await receiversFormik.setFieldValue(id + 'Bounds', bounds);
    };
    const setLocationValueCarriers = async (
        id: 'fromLocation' | 'toLocation',
        value: string,
        placeId: string,
        bounds: IBounds
    ) => {
        await carriersFormik.setFieldValue(id, value);
        await carriersFormik.setFieldValue(id + '_placeId', placeId);
        await carriersFormik.setFieldValue(id + 'Bounds', bounds);
    };

    return (
        <div className={styles.filtersWrapper}>
            {type === OrderSeachType.carriers && (
                <form onSubmit={carriersFormik.handleSubmit}>
                    <div className={styles.formR}>
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='fromLocation'>{t('from')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value:
                                        carriersFormik.values.fromLocation ??
                                        '',
                                    placeholder: t('enterLocation') as string,
                                    onChange: carriersFormik.handleChange,
                                    error:
                                        carriersFormik.errors.fromLocation !==
                                        undefined,
                                    helperText:
                                        carriersFormik.errors.fromLocation &&
                                        (t(
                                            carriersFormik.errors.fromLocation
                                        ) as string),
                                    className: styles.input,
                                }}
                                setValue={setLocationValueCarriers}
                            />
                        </div>
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='toLocation'>{t('to')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'toLocation',
                                    name: 'toLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    value:
                                        carriersFormik.values.toLocation ?? '',
                                    placeholder: t('enterLocation') as string,
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
                        <div className={styles.WeightBenefitBlock}>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.WeightBenefitInput
                                )}
                            >
                                <label htmlFor='maxWeight'>
                                    {t('maxWeight')}
                                </label>
                                <TextField
                                    id='maxWeight'
                                    name='maxWeight'
                                    type='number'
                                    placeholder={t('weight') as string}
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {t('kg')}
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={
                                        carriersFormik.values.maxWeight ?? ''
                                    }
                                    onChange={carriersFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>

                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.WeightBenefitInput
                                )}
                            >
                                <label htmlFor='maxBenefit'>
                                    {t('maxBenefit')}
                                </label>
                                <TextField
                                    id='maxBenefit'
                                    name='maxBenefit'
                                    placeholder={t('benefit') as string}
                                    variant='outlined'
                                    type='number'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {t(userCurrency[currency])}
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={
                                        carriersFormik.values.maxBenefit ?? ''
                                    }
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
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='fromLocation'>{t('from')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'fromLocation',
                                    name: 'fromLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    placeholder: t('enterLocation') as string,
                                    value: receiversFormik.values.fromLocation,
                                    onChange: receiversFormik.handleChange,
                                    error:
                                        receiversFormik.errors.fromLocation !==
                                        undefined,
                                    helperText:
                                        receiversFormik.errors.fromLocation &&
                                        (t(
                                            receiversFormik.errors.fromLocation
                                        ) as string),
                                    className: styles.input,
                                }}
                                setValue={setLocationValueReceivers}
                            />
                        </div>
                        <div className={cn(styles.inputItem, styles.longInput)}>
                            <label htmlFor='toLocation'>{t('to')}</label>
                            <RegionAutocomplete
                                textFieldProps={{
                                    id: 'toLocation',
                                    name: 'toLocation',
                                    type: 'string',
                                    variant: 'outlined',
                                    placeholder: t('enterLocation') as string,
                                    value: receiversFormik.values.toLocation,
                                    onChange: receiversFormik.handleChange,
                                    error:
                                        receiversFormik.errors.toLocation !==
                                        undefined,
                                    helperText:
                                        receiversFormik.errors.toLocation &&
                                        (t(
                                            receiversFormik.errors.toLocation
                                        ) as string),
                                    className: styles.input,
                                }}
                                setValue={setLocationValueReceivers}
                            />
                        </div>
                        <div className={styles.WeightBenefitBlock}>
                            <div className={styles.inputItem}>
                                <label htmlFor='maxPrice'>
                                    {t('maxPrice')}
                                </label>
                                <TextField
                                    id='maxPrice'
                                    name='maxPrice'
                                    type='number'
                                    placeholder={t('price') as string}
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {t(userCurrency[currency])}
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={
                                        receiversFormik.values.maxPrice ?? ''
                                    }
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
                                    placeholder={t('weight') as string}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {t('kg')}
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant='outlined'
                                    value={
                                        receiversFormik.values.maxWeight ?? ''
                                    }
                                    onChange={receiversFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div
                                className={cn(
                                    styles.inputItem,
                                    styles.inputItemLast
                                )}
                            >
                                <label htmlFor='minBenefit'>
                                    {t('minBenefit')}
                                </label>
                                <TextField
                                    id='minBenefit'
                                    name='minBenefit'
                                    variant='outlined'
                                    type='number'
                                    placeholder={t('benefit') as string}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {t(userCurrency[currency])}
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={
                                        receiversFormik.values.minBenefit ?? ''
                                    }
                                    onChange={receiversFormik.handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
            <div className={styles.searchButtons}>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale:0.95}}>
                    <Button
                        variant='contained'
                        className={styles.refreshButton}
                        onClick={reset}
                    >
                        <DeleteIcon fontSize='small' />
                        {t('reset')}
                    </Button>
                </motion.div>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                    <Button
                        variant='contained'
                        className={styles.refreshButton}
                        onClick={onRefreshClick}
                    >
                        <LoopIcon fontSize='small' />
                        {t('refresh')}
                    </Button>                    
                </motion.div>                    
            </div>
        </div>
    );
};

export default SearchFilters;
