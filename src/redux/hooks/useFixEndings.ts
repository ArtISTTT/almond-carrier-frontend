import { useTranslation } from 'next-i18next';

const useFixEndings = () => {
    const { t } = useTranslation();

    return (value: number = 0) => {
        const lastNumber = Number(value.toString().split('').pop());
        const twoLastNumbers = Number(
            value.toString().split('').slice(-2).join('')
        );

        if (lastNumber === 1) {
            if (value === 11) {
                return `${value} ${t('elevenOrders')}`;
            } else if (lastNumber === 1 && value < 2) {
                return `${value} ${t('oneOrder')}`;
            } else {
                return `${value} ${t('atOneStartingOrders')}`;
            }
        } else if (lastNumber >= 5 || lastNumber === 0) {
            return `${value} ${t('elevenOrders')}`;
        } else if (
            lastNumber >= 2 &&
            lastNumber <= 4 &&
            (twoLastNumbers < 12 || twoLastNumbers > 14)
        ) {
            return `${value} ${t('twoFourOrders')}`;
        } else {
            return `${value} ${t('elevenOrders')}`;
        }
    };
};

export default useFixEndings;
