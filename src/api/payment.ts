import { createHmac } from 'crypto';
import md5 from 'md5';
import { IOrderFull } from 'src/interfaces/order';
import { IUser } from 'src/interfaces/user';

type Params = {
    amount: string;
    cf2: string;
    currency: string;
    email: string;
    merchant_site: string;
    opcode: string;
    order_id: string;
    success_url: string;
    product_name: string;
};

/**
 * Генерирует HMAC SHA256 подпись для данных.
 */
function generateHMACSignature(params: Params, secretKey: string) {
    const sortedValues = Object.entries(params)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Сортируем по ключам
        .filter(
            ([_, value]) =>
                value !== null && value !== undefined && value !== ''
        )
        .map(([_, value]) => value.toString()); // Приводим все значения к строкам

    // Объединяем значения с использованием разделителя '|'
    const dataToSign = sortedValues.join('|');

    console.log(dataToSign);

    // Создаем HMAC подпись
    const hmac = createHmac('sha256', secretKey);
    hmac.update(dataToSign);
    return hmac.digest('hex');
}

export const startPayment = async (order: IOrderFull, user: IUser) => {
    if (
        !order.totalPaymentAmount ||
        !order.totalPaymentFee ||
        !order.productName
    ) {
        return;
    }

    const data = {
        // amount: order.totalPaymentAmount + '.00',
        // cf2: `${order.totalPaymentAmount - order.totalPaymentFee}.00; ${
        //         order.totalPaymentFee
        // }.00`,
        amount: 10 + '.00',
        cf2: `7.00; 3.00`,
        currency: '643', // RUB
        email: user.email,
        merchant_site: process.env.NEXT_PUBLIC_QIWI_MERCHANT_SITE as string,
        opcode: '3',
        order_id: order.id,
        success_url:
            (process.env.NEXT_PUBLIC_CALLBACK_URI as string) +
            'payment-callback',
        product_name: order.productName,
    };

    const signature = generateHMACSignature(
        data,
        process.env.NEXT_PUBLIC_QIWI_SECRET_KEY as string
    );

    const urlParams = new URLSearchParams({
        ...data,
        sign: signature,
    });

    console.log({
        ...data,
        sign: signature,
    });

    const url = `${
        process.env.NEXT_PUBLIC_QIWI_PAY_API + 'paypage/initial?'
    }${urlParams.toString()}`;

    window.open(url, '_blank')?.focus();
};

export const startPayout = async (id: string, sdRef: string) => {
    const sector = process.env.NEXT_PUBLIC_PAYGINE_SECTOR_ID as string;
    const password = process.env.NEXT_PUBLIC_PAYGINE_PASSWORD;
    const signatureString = sector + id + sdRef + password;
    const md5String = md5(signatureString, {
        encoding: 'UTF-8',
    });
    const signature = Buffer.from(md5String).toString('base64');

    const urlParams = new URLSearchParams({
        signature,
        sector,
        id,
        sd_ref: sdRef,
    });

    const url = `${
        process.env.NEXT_PUBLIC_PAYGINE_URI +
        'webapi/b2puser/sd-services/SDPayOutPage?'
    }${urlParams.toString()}`;

    window.open(url, '_blank')?.focus();
};
