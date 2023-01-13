import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const { t } = useTranslation();

export const RecoverPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, t('passwordLong') as string)
        .matches(/[0-9]/, t('passwordRequiresNumbers') as string)
        .matches(/[a-z]/, t('passwordRequiresLowercaseLetter') as string)
        .matches(/[A-Z]/, t('passwordRequiresUppercaseLetter') as string)
        .required(t('required') as string),
    confitmPassword: Yup.string(),
    userId: Yup.string(),
    token: Yup.string(),
});
