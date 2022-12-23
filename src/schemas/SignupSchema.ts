import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .required('Required'),
    confitmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Must match "password" field value'
    ),
    dateOfBirth: Yup.date()
        .max(
            new Date(Date.now() - 567648000000),
            'You must be at least 18 years'
        )
        .required('Required'),
});
