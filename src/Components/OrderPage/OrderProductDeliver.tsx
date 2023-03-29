import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button, Collapse } from '@mui/material';
import cn from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useTranslation } from 'react-i18next';
import { completeOrder, sendProductCode } from 'src/api/order';
import styles from '../../../styles/OrderPage.module.css';
import { OpenAlertContext } from '../Layouts/Snackbar';

interface IProps {
    orderId: string;
    formik: any;
    updateOrder: (withoutLoading?: true) => Promise<void>;
}

enum ErrorEnum {
    ERROR = 'error',
    OK = 'ok',
}

const OrderProductDeliver: React.FC<IProps> = ({
    orderId,
    updateOrder,
    formik,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [error, setError] = useState<ErrorEnum | undefined>(undefined);
    const [secondsAfterSend, setSecondsAfterSend] = useState(60);

    const inputCode = (e: string) => setCode(e);

    const handleOpen = () => setIsOpen(prev => !prev);

    const sendCode = async () => {
        setIsCodeSent(true);
        setSecondsAfterSend(60);

        const data = await sendProductCode({ orderId });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('codeSentCheckYourEmail'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('codeSentError'),
            });
        }
    };

    const completeOrderClick = async () => {
        const data = await completeOrder({
            orderId,
            completionCode: code,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('successfullyConfirmed'),
            });
            setError(ErrorEnum.OK);
        } else {
            setCode('');
            setError(ErrorEnum.ERROR);
        }

        formik.setSubmitting(false);
        await updateOrder(true);
    };

    useEffect(() => {
        if (secondsAfterSend > 0 && isCodeSent) {
            setTimeout(setSecondsAfterSend, 1000, secondsAfterSend - 1);
        }
    }, [secondsAfterSend, isCodeSent]);

    return (
        <>
            <div className={styles.productDeliveredOpenButton}>
                <PriorityHighIcon className={styles.productDeliveredIcon} />
                <Button
                    variant='outlined'
                    className={styles.orderPaymentWrapperButton}
                    color='primary'
                    onClick={handleOpen}
                >
                    {t('checkTheProductYouReceived')}
                </Button>
                <PriorityHighIcon className={styles.productDeliveredIcon} />
            </div>
            <Collapse in={isOpen}>
                <div
                    className={cn(styles.productDeliveredBlock, {
                        [styles.productDeliveredBlockSuccess]:
                            error === ErrorEnum.OK,
                        [styles.productDeliveredBlockError]:
                            error === ErrorEnum.ERROR,
                    })}
                >
                    <div className={styles.productDeliveredContentSecond}>
                        {t('ifYoureSatisfiedEnterCodeSentToEmail')}
                    </div>
                    {isCodeSent ? (
                        <>
                            <div className={styles.productDeliveredInput}>
                                <ReactCodeInput
                                    name='acceptKey'
                                    inputMode='tel'
                                    type='number'
                                    value={code}
                                    onChange={inputCode}
                                    fields={6}
                                />
                                {secondsAfterSend > 0 ? (
                                    <span>
                                        {t('againAfterSec', {
                                            secondsAfterSend,
                                        })}
                                    </span>
                                ) : (
                                    <span onClick={sendCode}>
                                        {t('sendAgain')}
                                    </span>
                                )}
                            </div>
                            <div className={styles.acceptButtons}>
                                <Button
                                    className={styles.buttonItem}
                                    onClick={completeOrderClick}
                                    variant='contained'
                                    color='primary'
                                >
                                    {t('accept')}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.acceptButtons}>
                            <Button
                                onClick={sendCode}
                                className={styles.buttonItem}
                                variant='contained'
                                color='primary'
                            >
                                {t('sendCode')}
                            </Button>
                        </div>
                    )}
                </div>
            </Collapse>
            <div
                className={cn(styles.productDeliveredHelperText, {
                    [styles.productDeliveredBlockTextSuccess]:
                        error === ErrorEnum.OK,
                    [styles.productDeliveredBlockTextError]:
                        error === ErrorEnum.ERROR,
                })}
            >
                {error !== undefined && (
                    <span>
                        {error === ErrorEnum.ERROR
                            ? t('invalidCode')
                            : t('receiptConfirmed')}
                    </span>
                )}
            </div>
        </>
    );
};

export default OrderProductDeliver;
