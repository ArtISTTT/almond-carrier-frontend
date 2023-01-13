import { Currency } from '../interfaces/settings';

const OUR_COMISSION_RUB = 1500;
const OUR_COMISSION_USD_USD = 20;
const OUR_COMISSION_USD_EUR = 18;

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
