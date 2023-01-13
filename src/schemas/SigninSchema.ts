import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const { t } = useTranslation();

export const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .email(t('invalidEmail') as string)
        .required(t('required') as string),
    password: Yup.string()
        .min(8, t('passwordLong') as string)
        .matches(/[0-9]/, t('passwordRequiresNumbers') as string)
        .matches(/[a-z]/, t('passwordRequiresLowercaseLetter') as string)
        .matches(/[A-Z]/, t('passwordRequiresUppercaseLetter') as string)
        .required(t('required') as string),
});
