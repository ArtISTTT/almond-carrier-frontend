import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Positions } from './OrderChat';
import cn from 'classnames';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/OrderChat.module.css';
import { IMessage, MessageType } from 'src/interfaces/chat';
import MessageChat from './MessageChat';
import dayjs from 'dayjs';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';
import { OrderStatus } from 'src/interfaces/profile';
import {motion} from 'framer-motion'

const keys = {
    ENTER: 13,
    TAB: 16,
    CTRL: 17,
};

interface IDialogMessage {
    avatar: string;
    text: string;
    position: Positions;
}

interface IProps {
    onSendMessage: (text: string) => void;
    orderStatus: OrderStatus;
    messages: IMessage[];
    isMessagesLoading: boolean;
    loadMessages: () => Promise<void>;
    errorMessage: string;
    personAvatar?: string;
    myDataAvatar?: string;
    messagesPanelRef: React.RefObject<HTMLDivElement>;
}

const MessagesPanel: React.FC<IProps> = ({
    personAvatar,
    myDataAvatar,
    orderStatus,
    onSendMessage,
    messages,
    isMessagesLoading,
    loadMessages,
    errorMessage,
    messagesPanelRef,
}) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [pushedKeys, setPushedKeys] = useState<number[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentDate(dayjs());
        }, 60000);

        return () => {
            clearTimeout(timeout);
        };
    });

    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const newKeys = pushedKeys.concat([event.keyCode]);

        if (newKeys.includes(keys.ENTER)) {
            if (newKeys.includes(keys.TAB) || newKeys.includes(keys.CTRL)) {
                return;
            }

            await formik.submitForm();
        }

        setPushedKeys(newKeys);
    };

    const onKeyUp = async () => {
        setPushedKeys([]);
    };

    const addMessage = async (form: IDialogMessage) => {
        if (!form.text.trim()) {
            return;
        } else {
            await onSendMessage(form.text.trim());
            await formik.setFieldValue('text', '');
        }
    };

    const formik = useFormik({
        initialValues: {
            text: '',
            avatar: '/static/images/thanks-for-registration/background.jpg',
            position: Positions.RIGHT,
        },
        onSubmit: addMessage,
    });

    return (
        <div className={styles.contentBlock}>
            {!isMessagesLoading ? (
                <div
                    ref={messagesPanelRef}
                    className={cn(styles.messages, {
                        [styles.errorMessageBlock]: errorMessage,
                    })}
                >
                    {!errorMessage ? (
                        <>
                            {messages &&
                                messages.map((message: IMessage) => (
                                    <MessageChat
                                        personAvatar={personAvatar}
                                        myDataAvatar={myDataAvatar}
                                        currentDate={currentDate}
                                        key={message.createdAt.toISOString()}
                                        type={message.type}
                                        createdAt={message.createdAt}
                                        messageText={message.messageText}
                                        readByRecipients={
                                            message.readByRecipients
                                        }
                                    />
                                ))}
                        </>
                    ) : (
                        <MessageChat
                            errorMessage={errorMessage}
                            currentDate={currentDate}
                            key={dayjs().toISOString()}
                            type={MessageType.Admin}
                            createdAt={dayjs()}
                            messageText={errorMessage}
                            readByRecipients={true}
                        />
                    )}
                </div>
            ) : (
                <CircleLoader color={LoaderColors.PRIMARY} />
            )}

            {errorMessage ? (
                <>
                    <Button
                        onClick={loadMessages}
                        className={styles.errorButton}
                        variant='contained'
                    >
                        {t('refresh')}
                    </Button>
                </>
            ) : (
                <form
                    className={styles.sendMessageBlock}
                    onSubmit={formik.handleSubmit}
                    action='submit'
                >
                    <TextField
                        InputProps={{
                            disableUnderline: true,
                        }}
                        id='text'
                        disabled={orderStatus === OrderStatus.cancelled}
                        name='text'
                        variant='filled'
                        className={styles.inputMessage}
                        placeholder={t('message') as string}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        multiline
                        maxRows={3}
                    />
                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <Button type='submit'>
                            <SendIcon
                                type='submit'
                                color='primary'
                                className={styles.sendIcon}
                                sx={{ fontSize: 40 }}
                            />
                        </Button>
                    </motion.div>
                </form>
            )}
        </div>
    );
};

export default MessagesPanel;
