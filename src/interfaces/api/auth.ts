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

export type IRecover = {
    email: string;
};

export type IRecoverReturn = {
    error?: string | undefined;
    ok: boolean;
};

export type IProcessRecover = {
    password: string;
    userId: string;
    token: string;
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

export type IUpdateUserInfo = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    phoneNumber: string;
};

export type IUpdateUserInfoReturn = {
    error?: string | undefined;
    ok: boolean;
    user?: IUser;
};

export type IUpdateUserPassword = {
    oldPassword: string;
    newPassword: string;
};

export type IUpdateAvatar = {
    avatar: File;
};

export type IUpdatePasswordReturn = {
    error?: string | undefined;
    ok: boolean;
};
