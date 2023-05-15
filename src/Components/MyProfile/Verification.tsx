import VerifiedIcon from '@mui/icons-material/Verified';
import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { startVerification } from 'src/interfaces/api/verification';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/selectors/user';
import styles from 'styles/General.module.css';

export const Verification = () => {
    const user = useAppSelector(selectUser);
    const [isIframeShowed, setIsIframeShowed] = useState(false);
    const [IframeSrc, setIframeSrc] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const isUserVerified = useAppSelector(
        state => state.user.data?.idVerificationCompleted
    );

    const showIframe = (src: string) => {
        setIframeSrc(src);
        setIsIframeShowed(true);
    };

    const startVerificationClick = async () => {
        await startVerification(user.email, showIframe);
    };

    return (
        <div className={cn(styles.wrapper, styles.verWrapper)}>
            {isUserVerified ? (
                <div className={styles.verificationComplete}>
                    <VerifiedIcon />
                    <Typography
                        variant='h4'
                        component='h4'
                        className={styles.verificationCompleteText}
                    >
                        {t('verificationSuccessful')}
                    </Typography>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};
