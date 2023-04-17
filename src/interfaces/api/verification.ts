export const startVerification = async (
    email: string,
    showIframe: (src: string) => void
) => {
    const payload = {
        //your unique request reference
        reference: `SP_REQUEST_${Math.random()}`,,
        //URL where you will receive the webhooks from Shufti Pro
        callback_url: process.env.NEXT_PUBLIC_SP_CALLBACK_URI,
        //end-user email
        email: email,
        //end-user country
        country: '',
        //select ISO2 code for your desired language on verification screen
        language: 'RU',
        //URL where end-user will be redirected after verification completed
        redirect_url: 'https://friendlycarrier.com/profile/verification',
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

    fetch(
        `https://api.shuftipro.com/`,
        {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + token,
            },
            body: JSON.stringify(payload),
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.event && data.event === 'request.pending') {
                showIframe(data.verification_url);
            }
        });
};
