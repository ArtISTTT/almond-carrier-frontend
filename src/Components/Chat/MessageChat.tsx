import { Avatar, Typography } from '@mui/material';
import React from 'react';
import styles from '../../../styles/OrderChat.module.css';
import cn from 'classnames';
import { MessageType } from 'src/interfaces/chat';
import { Dayjs } from 'dayjs';

interface IProps {
    messageText: string;
    type: MessageType;
    createdAt: Dayjs;
    readByRecipients: boolean;
}

const MessageChat: React.FC<IProps> = ({ messageText, type, createdAt }) => {
    return (
        <div
            className={cn({
                [styles.MessageBlock]: type === MessageType.Other,
                [styles.ReversedMessageBlock]: type === MessageType.Mine,
            })}
        >
            {type !== MessageType.Admin && (
                <Avatar
                    src='/static/images/thanks-for-registration/background.jpg'
                    sx={{ height: 35, width: 35 }}
                />
            )}
            <Typography
                variant='body1'
                component='h6'
                className={cn(styles.messageText, {
                    [styles.OurMessageBlock]: type === MessageType.Admin,
                })}
            >
                {messageText}
            </Typography>
        </div>
    );
};

export default MessageChat;
