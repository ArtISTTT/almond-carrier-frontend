import { Button, Link as MUILink } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/ThanksForRegistration.module.css';
import { useRouter } from 'next/router';

const SignIn: React.FC = () => {
    const router = useRouter();

    const continueAsACarrier = () => {
        router.push('/carrier');
    };

    const continueAsAReceiver = () => {
        router.push('/receiver');
    };

    return (
        <div className={style.thanksForRegistrationWrapper}>
            <div className={style.selectWrapper}>
                <h3>Select your role</h3>
                <div className={style.selectBlock}>
                    <div className={style.selectCarrier}>
                        <h3>Carrier</h3>
                        <span>
                            If you are traveling from one country to another,
                            then you can be a carrier. You can accept offers to
                            bring something to a receiver.
                        </span>
                        <Button
                            onClick={continueAsACarrier}
                            variant='contained'
                        >
                            Continue as a carrier
                        </Button>
                    </div>
                    <div className={style.selectReceiver}>
                        <h3>Receiver</h3>
                        <span>
                            If you live in a country where you don’t have
                            something what you need, than you can ask a carrier
                            to bring it from the country where he is now.
                        </span>
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
    );
};

export default SignIn;
