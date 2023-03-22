import { localStorageUserData } from '../helpers/localStorageUserData';
import {
    IGetCurrentUserReturn,
    ISignUp,
    ISignUpReturn,
} from '../interfaces/api/auth';
import {
    IProcessRecover,
    IRecover,
    IRecoverReturn,
    ISignIn,
    ISignInReturn,
    ISignOutReturn,
    IUpdateAvatar,
    IUpdatePasswordReturn,
    IUpdateUserInfo,
    IUpdateUserInfoReturn,
    IUpdateUserPassword,
    IVerifyEmail,
    IVerifyEmailReturn,
} from './../interfaces/api/auth';
import { mainInstance } from './instance';

export const signUp = (requestData: ISignUp): Promise<ISignUpReturn> =>
    mainInstance
        .post(
            '/auth/signup',
            JSON.stringify({
                ...requestData,
                dateOfBirth: requestData.dateOfBirth.toDate(),
            })
        )
        .then(data => {
            if (data.data.email) {
                localStorageUserData.setUserData(data.data);
            }

            return {
                ok: true,
                user: data.data,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const signIn = (requestData: ISignIn): Promise<ISignInReturn> =>
    mainInstance
        .post('/auth/signin', JSON.stringify(requestData))
        .then(data => {
            if (data.data.email) {
                localStorageUserData.setUserData(data.data);
            }

            return {
                ok: true,
                user: data.data,
            };
        })
        .catch(data => {
            if (data.response?.data.notVerified) {
                return {
                    ok: false,
                    notVerified: true,
                };
            }

            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const recoverPassword = (
    requestData: IRecover
): Promise<IRecoverReturn> =>
    mainInstance
        .post('/auth/recover', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const processRecoverPassword = (
    requestData: IProcessRecover
): Promise<IRecoverReturn> =>
    mainInstance
        .post('/auth/process-recover', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const signOut = (): Promise<ISignOutReturn> =>
    mainInstance
        .post('/auth/signout')
        .then(data => {
            return {
                ok: true,
                user: data.data,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response.data.message ?? 'Error',
            };
        });

export const getCurrentUser = (): Promise<IGetCurrentUserReturn> =>
    mainInstance
        .get('/user')
        .then(data => {
            if (data.data.email) {
                localStorageUserData.setUserData(data.data);
            }

            return {
                ok: true,
                user: data.data,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const updateUserInfo = (
    requestData: IUpdateUserInfo
): Promise<IUpdateUserInfoReturn> =>
    mainInstance
        .post(
            '/update-user-info',
            JSON.stringify({
                ...requestData,
                dateOfBirth: requestData.dateOfBirth.toDate(),
            })
        )
        .then(data => {
            return {
                ok: true,
                user: data.data.user,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const updateUserPassword = (
    requestData: IUpdateUserPassword
): Promise<IUpdatePasswordReturn> =>
    mainInstance
        .post('/update-user-password', JSON.stringify(requestData))
        .then(() => {
            return {
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });

export const updateAvatar = (
    requestData: IUpdateAvatar
): Promise<IUpdatePasswordReturn> => {
    const formData = new FormData();

    formData.append('image', requestData.avatar);

    return mainInstance
        .post('/update-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(data => {
            return {
                avatar: data.data.avatar,
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });
};

export const verifyEmail = (
    requestData: IVerifyEmail
): Promise<IVerifyEmailReturn> =>
    mainInstance
        .post('/auth/verify', JSON.stringify(requestData))
        .then(data => {
            return {
                user: data.data,
                ok: true,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });
