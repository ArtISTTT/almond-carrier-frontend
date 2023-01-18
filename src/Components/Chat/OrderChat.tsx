import { Avatar, Typography, TextField } from '@mui/material';
import React from 'react';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/OrderChat.module.css';
import SendIcon from '@mui/icons-material/Send';
import MessageChat from './MessageChat';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface IProps {
    user: IUser;
}

interface IDialogMessage {
    avatar: string;
    text: string;
    position: Positions;
}

export enum Positions {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center',
}

const defaultMessages = [
    {
        text: 'asd asd asd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asds',
        avatar: '/static/images/thanks-for-registration/background.jpg',
        position: Positions.LEFT,
    },
    {
        text: 'qwe qwe',
        avatar: '/static/images/thanks-for-registration/background.jpg',
        position: Positions.LEFT,
    },
    {
        text: 'asdasd',
        avatar: '/static/images/thanks-for-registration/background.jpg',
        position: Positions.CENTER,
    },
    {
        text: 'asdasd',
        avatar: '/static/images/thanks-for-registration/background.jpg',
        position: Positions.RIGHT,
    },
    {
        text: 'asd asd asd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asds',
        avatar: '/static/images/thanks-for-registration/background.jpg',
        position: Positions.RIGHT,
    },
];

const OrderChat: React.FC<IProps> = ({ user }) => {
    const [dialogMessages, setDialogMessages] =
        React.useState<IDialogMessage[]>(defaultMessages);

    const { t } = useTranslation();

    const addMessage = async (form: IDialogMessage) => {
        if (!form.text.trim()) {
            return;
        }
        await setDialogMessages([...dialogMessages, form]);
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
        <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>
                <Avatar sx={{ height: 50, width: 50 }} />
                <div className={styles.chatMember}>
                    <Typography
                        className={styles.chatMemberName}
                        variant='h6'
                        component='h6'
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography
                        className={styles.chatMemberOnline}
                        variant='subtitle2'
                        component='h6'
                    >
                        {t('lastSeenOnline')} 15m {t('ago')}
                    </Typography>
                </div>
            </div>
            <div className={styles.contentBlock}>
                <div className={styles.messages}>
                    {dialogMessages.map(message => (
                        <MessageChat
                            avatar={message.avatar}
                            text={message.text}
                            position={message.position}
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
        </div>
    );
};

export default OrderChat;
