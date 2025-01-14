import { Avatar, Typography } from '@mui/material';
import React from 'react';
import styles from '../../../styles/OrderChat.module.css';
import cn from 'classnames';
import { MessageType } from 'src/interfaces/chat';
import ErrorIcon from '@mui/icons-material/Error';
import { Dayjs } from 'dayjs';
import { useDifferenceTime } from 'src/redux/hooks/useDifferenceTime';
import { useTranslation } from 'react-i18next';

interface IProps {
    errorMessage?: string;
    messageText: string;
    myDataAvatar?: string;
    personAvatar?: string;
    type: MessageType;
    createdAt: Dayjs;
    readByRecipients: boolean;
    currentDate: Dayjs;
}

const MessageChat: React.FC<IProps> = ({
    messageText,
    myDataAvatar,
    personAvatar,
    type,
    createdAt,
    errorMessage,
    currentDate,
}) => {
    const messageTime = useDifferenceTime(currentDate);
    const { t } = useTranslation();

    return (
        <div
            className={cn({
                [styles.MessageBlock]: type === MessageType.Other,
                [styles.MyMessageBlock]: type === MessageType.Mine,
            })}
        >
            {type !== MessageType.Admin && (
                <Avatar
                    className={styles.messageAvatar}
                    src={
                        type === MessageType.Mine ? myDataAvatar : personAvatar
                    }
                    sx={{ height: 35, width: 35 }}
                />
            )}
            <div
                className={cn({
                    [styles.personMessageInfo]: type === MessageType.Other,
                    [styles.messageInfo]: type === MessageType.Mine,
                })}
            >
                <Typography
                    variant='body1'
                    component='h6'
                    className={cn(styles.messageText, {
                        [styles.OurMessageBlock]: type === MessageType.Admin,
                    })}
                >
                    {errorMessage ? (
                        <div className={styles.errorMessage}>
                            <ErrorIcon />
                            <span>{t(messageText)}</span>
                        </div>
                    ) : (
                        messageText
                    )}
                </Typography>
                {type !== MessageType.Admin && (
                    <div className={styles.sendTime}>
                        {messageTime(createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageChat;
