import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const { t } = useTranslation();

export const EmailSchema = Yup.object().shape({
    email: Yup.string()
        .email(t('invalidEmail') as string)
        .required(t('required') as string),
});
