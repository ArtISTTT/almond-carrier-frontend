import dayjs from 'dayjs';
import { StaticImageData } from 'next/image';
import { IPayout } from 'src/interfaces/order';
import { Banks } from 'src/interfaces/user';

interface IProps {
    payouts: IPayout[];
    banks: {
        value: Banks;
        text: string;
        image: StaticImageData;
    }[];
}

export const parsePayoutsFromApi = ({ payouts, banks }: IProps) => {
    return payouts.map(payout => {
        const actuallyBank = banks.find(
            payoutBank => payoutBank.value === payout.bank
        );

        return {
            ...payout,
            completedDate: dayjs(payout.completedDate).format(
                'DD.MM.YYYY'
            ) as string,
            bank: actuallyBank?.text,
        };
    }) as IPayout[];
};
