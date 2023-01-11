import { useAppSelector } from './index';
import formatSumFunc from '../../helpers/formatSumFunc';
import { Currency } from '../../interfaces/settings';

const useFormatAmount = () => {
    const userCurrency = useAppSelector(
        state => state.settings.generalSettings.currency
    );

    return (sum: string | number) => {
        const fixedSum = formatSumFunc(sum);

        switch (userCurrency) {
            case Currency.DOLLAR:
                return fixedSum.concat(' USD');
            case Currency.EURO:
                return fixedSum.concat(' EUR');
            case Currency.RUBEL:
                return fixedSum.concat(' РУБ');
            default:
                return sum;
        }
    };
};

export default useFormatAmount;
