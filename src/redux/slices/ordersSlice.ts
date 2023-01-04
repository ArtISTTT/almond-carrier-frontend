import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';

type IOrdersState = {
    myOrders: IOrder[];
};

const initialState: IOrdersState = {
    myOrders: [],
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setMyOrders: (state, action: PayloadAction<IOrder[]>) => {
            state.myOrders = action.payload;
        },
    },
});

export const { setMyOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
