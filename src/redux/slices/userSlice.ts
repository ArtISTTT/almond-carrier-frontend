import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

type IUserState = {
    data: IUser | undefined;
    isAuthorized: boolean;
    initializeAuthChecked: boolean;
};

const initialState: IUserState = {
    data: undefined,
    isAuthorized: false,
    initializeAuthChecked: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload;
        },
        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setInitializeAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.initializeAuthChecked = action.payload;
        },
    },
});

export const { addUserData, setIsAuthorized, setInitializeAuthChecked } =
    userSlice.actions;
export default userSlice.reducer;
