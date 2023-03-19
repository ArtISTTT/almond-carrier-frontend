import { useTranslation } from 'next-i18next';
import { Currency } from './../../interfaces/settings';

const useFormatAmount = () => {
    const { t } = useTranslation();

    return (
        sum: string | number,
        customCurrency: Currency,
        addCurrency?: boolean
    ) => {
        const reversedSum = sum.toString().split('').reverse();

        for (let i = 0; i < reversedSum.length; i++) {
            if (i % 4 === 0) {
                reversedSum.splice(i, 0, ',');
            }
        }
        reversedSum.reverse().pop();

        const finalSum = reversedSum.join('');

        if (addCurrency) {
            return finalSum.concat(`${t(customCurrency)}`);
        }

        return finalSum;
    };
};

export default useFormatAmount;
