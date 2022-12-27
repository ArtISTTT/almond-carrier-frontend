import { IUser } from '../../interfaces/user';
import { RootState } from './../index';

export const selectUser = (state: RootState) => state.user.data as IUser;

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;

export const selectIsInitializeAuthChecked = (state: RootState) =>
    state.user.initializeAuthChecked;
