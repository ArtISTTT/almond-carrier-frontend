import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const { t } = useTranslation();

const nameRegex = /^[A-Za-z0-9]+$/;

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, t('tooShort') as string)
        .max(50, t('tooLong') as string)
        .required(t('required') as string),
    lastName: Yup.string()
        .min(2, t('tooShort') as string)
        .max(50, t('tooLong') as string)
        .required(t('required') as string),
    email: Yup.string()
        .email(t('invalidEmail') as string)
        .required(t('required') as string),
    password: Yup.string()
        .min(8, t('passwordLong') as string)
        .matches(nameRegex, t('onlyEnglish') as string)
        .matches(/[0-9]/, t('passwordRequiresNumbers') as string)
        .matches(/[a-z]/, t('passwordRequiresLowercaseLetter') as string)
        .matches(/[A-Z]/, t('passwordRequiresUppercaseLetter') as string)
        .required(t('required') as string),
    confirmPassword: Yup.string()
        .test(
            'passwords-match',
            t('passwordsMustMatch') as string,
            function (value) {
                return this.parent.password === value;
            }
        )
        .required(t('required') as string),
    dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), t('mustBeYears') as string)
        .required(t('required') as string),
});
