import { Currency } from './../interfaces/settings';

const formatSumFunc = (sum: string | number, currency: Currency) => {
    const reversedSum = sum.toString().split('').reverse();

    for (let i = 0; i < reversedSum.length; i++) {
        if (i % 4 === 0) {
            reversedSum.splice(i, 0, ',');
        }
    }
    reversedSum.reverse().pop();

    let finalSum = reversedSum.join('');

    if (currency === Currency.EUR) {
        finalSum = finalSum.concat(' EUR');
    }
    if (currency === Currency.RUB) {
        finalSum = finalSum.concat(' РУБ');
    }
    if (currency === Currency.USD) {
        finalSum = finalSum.concat(' USD');
    }

    return finalSum;
};

export default formatSumFunc;
