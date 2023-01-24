import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Positions } from './OrderChat';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/OrderChat.module.css';
import { IMessage } from 'src/interfaces/chat';
import MessageChat from './MessageChat';
import dayjs, { Dayjs } from 'dayjs';

interface IDialogMessage {
    avatar: string;
    text: string;
    position: Positions;
}

interface IProps {
    onSendMessage: (text: string) => void;
    messages: IMessage[];
}

const MessagesPanel: React.FC<IProps> = ({ onSendMessage, messages }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const { t } = useTranslation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentDate(dayjs());
        }, 60000);

        return () => {
            clearTimeout(timeout);
        };
    });

    const addMessage = async (form: IDialogMessage) => {
        if (!form.text.trim()) {
            return;
        }
        onSendMessage(form.text);

        await formik.setFieldValue('text', '');
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
            <div className={styles.messages}>
                {messages &&
                    messages.map((message: IMessage) => (
                        <MessageChat
                            currentDate={currentDate}
                            key={message.createdAt.toISOString()}
                            type={message.type}
                            createdAt={message.createdAt}
                            messageText={message.messageText}
                            readByRecipients={message.readByRecipients}
                        />
                    ))}
            </div>
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
        </div>
    );
};

export default MessagesPanel;
