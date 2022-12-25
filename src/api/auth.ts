import {
    ISignIn,
    ISignInReturn,
    ISignOutReturn,
} from './../interfaces/api/auth';
import { localStorageUserData } from '../helpers/localStorageUserData';
import {
    IGetCurrentUserReturn,
    ISignUp,
    ISignUpReturn,
} from '../interfaces/api/auth';
import { IUser } from '../interfaces/user';
import { mainInstance } from './instance';

export const signUp = (requestData: ISignUp): Promise<ISignUpReturn> =>
    mainInstance
        .post('/auth/signup', JSON.stringify(requestData))
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
                error: data.message,
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
            return {
                ok: false,
                error: data.message,
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
                error: data?.message ?? 'Error',
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
                error: data.message,
            };
        });
