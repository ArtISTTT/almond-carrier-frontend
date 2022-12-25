import { IUser } from '../user';

export type ISignUp = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
};

export type ISignUpReturn = {
    error?: string | undefined;
    ok: boolean;
    user?: IUser;
};

export type ISignIn = {
    email: string;
    password: string;
};

export type ISignInReturn = {
    error?: string | undefined;
    ok: boolean;
    user?: IUser;
};

export type IGetCurrentUserReturn = {
    error?: string | undefined;
    ok: boolean;
    user?: IUser;
};

export type ISignOutReturn = {
    error?: string | undefined;
    ok: boolean;
};
