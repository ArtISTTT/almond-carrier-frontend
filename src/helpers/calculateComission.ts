export const calculateComission = (
    totalAmount: number,
    productAmount: number,
    rewardAmount: number
) => totalAmount - productAmount - rewardAmount;
