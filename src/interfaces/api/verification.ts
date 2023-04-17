import { sha256 } from 'js-sha256';

const validateSignature = (
    data: string,
    signature: string | null,
    SK: string
) => {
    data = JSON.stringify(data);
    data = data.replace(/\//g, '\\/');
    data = `${data}${SK}`;

    sha256(data);
    const hash = sha256.create();
    hash.update(data);

    if (hash.hex() == signature) {
        return true;
    } else {
        return false;
    }
};

const createIframe = (src: string) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.id = 'shuftipro-iframe';
    iframe.name = 'shuftipro-iframe';
    iframe.allow = 'camera';
    iframe.src = src;
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.overflow = 'hidden';
    iframe.style.border = 'none';
    iframe.style.zIndex = '2147483647';
    iframe.width = '100%';
    iframe.height = '100%';

    document.body.appendChild(iframe);
};

export const startVerification = async (
    email: string,
    userId: string,
    showIframe: (src: string) => void
) => {
    const payload = {
        //your unique request reference
        reference: userId,
        //URL where you will receive the webhooks from Shufti Pro
        // "callback_url"				 : "https://yourdomain.com/profile/sp-notify-callback",
        //end-user email
        email: email,
        //end-user country
        country: '',
        //select ISO2 code for your desired language on verification screen
        language: 'RU',
        //URL where end-user will be redirected after verification completed
        redirect_url: 'https://friendlycarrier.com',
        //what kind of proofs will be provided to Shufti Pro for verification?
        verification_mode: 'image_only',
        //allow end-user to upload verification proofs if the webcam is not accessible
        allow_offline: '1',
        //allow end-user to upload real-time or already catured proofs
        allow_online: '1',
        //privacy policy screen will be shown to end-user
        show_privacy_policy: '1',
        //verification results screen will be shown to end-user
        show_results: '1',
        //consent screen will be shown to end-user
        show_consent: '1',
        //User cannot send Feedback
        show_feedback_form: '0',
        face: '',
        document: {
            name: '',
            dob: '',
            supported_types: ['id_card', 'passport'],
        },
    };

    const token = btoa(
        `${process.env.NEXT_PUBLIC_SP_CLIENT_ID}:${process.env.NEXT_PUBLIC_SP_SECRET}`
    );

    fetch('https://api.shuftipro.com/', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + token,
        },
        body: JSON.stringify(payload),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.event && data.event === 'request.pending') {
                showIframe(data.verification_url);
            }
        });
};
