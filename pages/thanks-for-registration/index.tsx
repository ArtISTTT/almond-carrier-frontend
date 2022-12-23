import { Button, Link as MUILink, Paper, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';
import { useRouter } from 'next/router';

const SignIn: React.FC = () => {
    const router = useRouter();

    const continueAsACarrier = () => {
        router.push('/carrier');
    };

    return (
        <div className={style.thanksForRegistrationWrapper}>
            <div className={style.selectWrapper}>
                {/* <h2>Thank for registration!</h2> */}
                <h3>SELECT YOUR ACCOUNT TYPE</h3>
                <Stack direction='row'>
                    <div className={style.accountTypeCard}>
                        <div>
                            <h3>Carrier</h3>
                            <span>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Non in facilis fugiat quos
                                culpa doloribus laborum exercitationem ea natus.
                                Adipisci eaque quia placeat eveniet, ea
                                distinctio cumque! Quos, numquam provident.
                            </span>
                        </div>
                        <Button
                            variant='contained'
                            className={style.thankYouButton}
                            onClick={continueAsACarrier}
                        >
                            Continue as as carrier
                        </Button>
                    </div>
                    <div className={style.accountTypeCard}>
                        <div>
                            <h3>Customer</h3>
                            <span>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sequi maxime in iste tempora
                                expedita ex modi deserunt, necessitatibus,
                                voluptas ipsum illo magnam aliquid libero soluta
                                ipsa pariatur doloremque quae officiis.
                            </span>
                        </div>
                        <Button
                            variant='contained'
                            className={style.thankYouButton}
                        >
                            Continue as a сustomer
                        </Button>
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default SignIn;
