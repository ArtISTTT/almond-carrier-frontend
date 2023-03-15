import dayjs from 'dayjs';
import { IPayout } from 'src/interfaces/order';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';

export const parsePayoutsFromApi = (payouts: IPayout[]) => {
    const { banksArray } = useGetBanks({});

    return payouts.map(payout => {
        const payoutBank = banksArray.find(
            payoutBank => payoutBank.value === payout.bank
        );

        return {
            ...payout,
            completedDate: dayjs(payout.completedDate).format(
                'DD.MM.YYYY'
            ) as string,
            bank: payoutBank?.text,
        };
    });
};
