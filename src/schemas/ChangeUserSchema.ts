import * as Yup from 'yup';

const nameRegex = /^[A-Za-z0-9]+$/;

export const ChangeUserSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), 'mustBeYears')
        .required('required'),
});

export const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(8, 'passwordLong')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .required('required'),
    newPassword: Yup.string()
        .min(8, 'passwordLong')
        .matches(nameRegex, 'onlyEnglish')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .test('match', 'previousPassword', function (password) {
            return password !== this.parent.oldPassword;
        })
        .required('required'),
});
