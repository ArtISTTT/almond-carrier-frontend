import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

const initialState: IUser = {
    email: '',
    dateOfBirth: new Date(),
    firstName: '',
    lastName: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.dateOfBirth = new Date(action.payload.dateOfBirth);
        },
    },
});

export const { addUserData } = userSlice.actions;
export default userSlice.reducer;
