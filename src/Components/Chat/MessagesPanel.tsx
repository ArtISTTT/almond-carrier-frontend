import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import styles from '../../../styles/OrderChat.module.css';
import MessageChat from './MessageChat';
import { Positions } from './OrderChat';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

interface IDialogMessage {
    avatar: string;
    text: string;
    position: Positions;
}

interface IProps {
    onSendMessage: (text: string) => void;
}

const MessagesPanel: React.FC<IProps> = ({ onSendMessage }) => {
    const { t } = useTranslation();

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
                {/* {channel &&
                    channel.messages &&
                    channel.messages.map((message: any) => (
                        <MessageChat
                            key={message.id}
                            id={message.id}
                            senderName={message.senderName}
                            text={message.text}
                            position={Positions.RIGHT}
                        />
                    ))} */}
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
