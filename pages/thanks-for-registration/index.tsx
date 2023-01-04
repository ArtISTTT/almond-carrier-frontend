import { Button, Link as MUILink, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/ThanksForRegistration.module.css';
import { useRouter } from 'next/router';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';

const SignIn: React.FC = () => {
    const router = useRouter();

    const continueAsACarrier = () => {
        router.push('/dashboard');
    };

    const continueAsAReceiver = () => {
        router.push('/receiver');
    };

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <div className={style.thanksForRegistrationWrapper}>
                <div className={style.selectWrapper}>
                    <Typography
                        variant='h2'
                        component='h2'
                        className={style.selectTitle}
                    >
                        Select your role
                    </Typography>
                    <div className={style.selectBlock}>
                        <div className={style.selectCarrier}>
                            <Typography
                                className={style.selectCarrierTitle}
                                variant='h3'
                                component='h3'
                            >
                                Carrier
                            </Typography>
                            <Typography
                                className={style.selectCarrierDescription}
                                variant='h4'
                                component='h4'
                            >
                                If you are traveling from one country to
                                another, then you can be a carrier. You can
                                accept offers to bring something to a receiver.
                            </Typography>
                            <Button
                                onClick={continueAsACarrier}
                                variant='contained'
                            >
                                Continue as a carrier
                            </Button>
                        </div>
                        <div className={style.selectReceiver}>
                            <Typography
                                className={style.selectReceiverTitle}
                                variant='h3'
                                component='h3'
                            >
                                Receiver
                            </Typography>
                            <Typography
                                className={style.selectReceiverDescription}
                                variant='h4'
                                component='h4'
                            >
                                If you live in a country where you don’t have
                                something what you need, than you can ask a
                                carrier to bring it from the country where he is
                                now.
                            </Typography>
                            <Button
                                onClick={continueAsAReceiver}
                                variant='contained'
                            >
                                Continue as a Receiver
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
};

export default SignIn;
