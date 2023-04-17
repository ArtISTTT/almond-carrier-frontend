import { Button } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';
import { startVerification } from 'src/interfaces/api/verification';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/selectors/user';
import styles from 'styles/General.module.css';

export const Verification = () => {
    const user = useAppSelector(selectUser);
    const [isIframeShowed, setIsIframeShowed] = useState(false);
    const [IframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

    const showIframe = (src: string) => {
        setIframeSrc(src);
        setIsIframeShowed(true);
    };

    const startVerificationClick = async () => {
        await startVerification(
            user.email,
            user.id,
            user.idVerification.verificationStarted,
            showIframe
        );
    };

    return (
        <div className={cn(styles.wrapper, styles.verWrapper)}>
            {isIframeShowed && IframeSrc ? (
                <iframe
                    src={IframeSrc}
                    className={styles.Iframe}
                    allow='camera'
                    id='shuftipro-iframe'
                    name='shuftipro-iframe'
                />
            ) : (
                <Button
                    color='primary'
                    onClick={startVerificationClick}
                    className={styles.submitButton}
                    variant='contained'
                >
                    Начать верификацию
                </Button>
            )}
        </div>
    );
};
