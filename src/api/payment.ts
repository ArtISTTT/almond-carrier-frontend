import axios from 'axios';
import md5 from 'md5';

export const startPayment = async (id: string, url: string) => {
    const sector = process.env.NEXT_PUBLIC_PAYGINE_SECTOR_ID as string;
    const password = process.env.NEXT_PUBLIC_PAYGINE_PASSWORD;
    const signatureString = sector + id + password;
    const md5String = md5(signatureString, {
        encoding: 'UTF-8',
    });
    const signature = Buffer.from(md5String).toString('base64');

    try {
        await axios.post(
            process.env.NEXT_PUBLIC_PAYGINE_URI +
                'webapi/b2puser/sd-services/SDPayInDebit',
            undefined,
            {
                params: {
                    signature,
                    sector,
                    id,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                maxRedirects: 5,
            }
        );
    } catch (e) {
        console.log(e);
    }
};
