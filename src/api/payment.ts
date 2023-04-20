import axios from 'axios';
import md5 from 'md5';

export const startPayment = async (id: string, sdRef: string) => {
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
        'webapi/b2puser/sd-services/SDPayInDebit?'
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
