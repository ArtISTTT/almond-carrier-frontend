import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const nameRegex = /^[A-Za-z0-9]+$/;

const { t } = useTranslation();

export const ChangeUserSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, t('tooShort') as string)
        .max(50, t('tooLong') as string)
        .required(t('required') as string),
    lastName: Yup.string()
        .min(2, t('tooShort') as string)
        .max(50, t('tooLong') as string)
        .required(t('required') as string),
    dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), t('mustBeYears') as string)
        .required(t('required') as string),
});

export const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(8, t('passwordLong') as string)
        .matches(/[0-9]/, t('passwordRequiresNumbers') as string)
        .matches(/[a-z]/, t('passwordRequiresLowercaseLetter') as string)
        .matches(/[A-Z]/, t('passwordRequiresUppercaseLetter') as string)
        .required(t('required') as string),
    newPassword: Yup.string()
        .min(8, t('passwordLong') as string)
        .matches(nameRegex, t('onlyEnglish') as string)
        .matches(/[0-9]/, t('passwordRequiresNumbers') as string)
        .matches(/[a-z]/, t('passwordRequiresLowercaseLetter') as string)
        .matches(/[A-Z]/, t('passwordRequiresUppercaseLetter') as string)
        .test('match', t('previousPassword') as string, function (password) {
            return password !== this.parent.oldPassword;
        })
        .required(t('required') as string),
});
