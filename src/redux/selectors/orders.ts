import { createSelector } from 'reselect';
import { RootState } from './../index';
import { orderStatus } from '../../interfaces/profile';

export const selectMyOrders = (state: RootState) => state.orders.myOrders;

export const selectMyLiveOrders = createSelector([selectMyOrders], orders => {
    return orders.filter(
        order =>
            order.status !== orderStatus.cancelled &&
            order.status !== orderStatus.success
    );
});
