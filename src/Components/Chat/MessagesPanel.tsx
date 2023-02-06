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
import dayjs, { Dayjs } from 'dayjs';
import MessagesLoader from '../MessagesLoader';

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
    messages: IMessage[];
    isMessagesLoading: boolean;
    loadMessages: () => Promise<void>;
    errorMessage: string;
}

const MessagesPanel: React.FC<IProps> = ({
    onSendMessage,
    messages,
    isMessagesLoading,
    loadMessages,
    errorMessage,
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

        console.log(newKeys);

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

    const keyDownSendMessage = async (
        e: React.KeyboardEvent<HTMLDivElement>
    ) => {
        if (e.keyCode === 13 && !(e.altKey || e.shiftKey)) {
            await formik.submitForm();
            await e.preventDefault();
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
                    className={cn(styles.messages, {
                        [styles.errorMessageBlock]: errorMessage,
                    })}
                >
                    {!errorMessage ? (
                        <>
                            {messages &&
                                messages.map((message: IMessage) => (
                                    <MessageChat
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
                <MessagesLoader />
            )}

            {!errorMessage ? (
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
                    <Button type='submit'>
                        <SendIcon
                            type='submit'
                            color='primary'
                            className={styles.sendIcon}
                            sx={{ fontSize: 40 }}
                        />
                    </Button>
                </form>
            ) : (
                <>
                    <Button
                        onClick={loadMessages}
                        className={styles.errorButton}
                        variant='contained'
                    >
                        {t('refresh')}
                    </Button>
                </>
            )}
        </div>
    );
};

export default MessagesPanel;
