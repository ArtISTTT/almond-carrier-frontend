import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const { t } = useTranslation();

export const ReceiverPopupSchema = Yup.object().shape({
    toLocation: Yup.string()
        .min(1)
        .required(t('required') as string),
    fromLocation: Yup.string().min(1),
    productName: Yup.string()
        .lowercase()
        .required(t('required') as string),
    rewardAmount: Yup.number()
        .min(0)
        .required(t('required') as string),
    productAmount: Yup.number()
        .min(0)
        .required(t('required') as string),
    productWeight: Yup.number()
        .min(0.1, t('greaterWeight') as string)
        .required(t('required') as string),
    productDescription: Yup.string().required(t('required') as string),
});

export const CarrierPopupSchema = Yup.object().shape({
    toLocation: Yup.string()
        .min(1)
        .required(t('required') as string),
    fromLocation: Yup.string()
        .min(1)
        .required(t('required') as string),
    rewardAmount: Yup.number()
        .min(0)
        .required(t('required') as string),
    carrierMaxWeight: Yup.number()
        .min(0.1, t('greaterWeight') as string)
        .required(t('required') as string),
    arrivalDate: Yup.date().min(new Date(), t('futureDate') as string),
});
