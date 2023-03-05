import { Currency } from '../interfaces/settings';
import {
    OUR_COMISSION_RUB,
    OUR_COMISSION_USD_EUR,
    OUR_COMISSION_USD_USD,
} from './comission';

export const calculateTotalAmount = (
    productAmount: number,
    rewardAmount: number,
    currency: Currency
) => {
    if (currency === Currency.RUB) {
        return productAmount + rewardAmount + OUR_COMISSION_RUB;
    } else if (currency === Currency.EUR) {
        return productAmount + rewardAmount + OUR_COMISSION_USD_EUR;
    } else {
        return productAmount + rewardAmount + OUR_COMISSION_USD_USD;
    }
};
