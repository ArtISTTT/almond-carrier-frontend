import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserData {
    email: string;
    dateOfBirth: Date | null;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword?: string;
}

interface initialState {
    email: string;
    dateOfBirth: Date | null;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword?: string;
}

const initialState: initialState = {
    email: '',
    dateOfBirth: null,
    firstName: '',
    lastName: '',
    password: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<IUserData>) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.password = action.payload.password;
        },
    },
});

export const { addUserData } = userSlice.actions;
export default userSlice.reducer;
