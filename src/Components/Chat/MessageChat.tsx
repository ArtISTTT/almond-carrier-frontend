import { Avatar, Typography } from '@mui/material';
import React from 'react';
import styles from '../../../styles/OrderChat.module.css';
import { Positions } from './OrderChat';
import cn from 'classnames';

interface IProps {
    text: string;
    position: Positions;
    senderName: string;
    id: number;
}

const MessageChat: React.FC<IProps> = ({ text, position }) => {
    return (
        <div
            className={cn({
                [styles.MessageBlock]: position === Positions.LEFT,
                [styles.ReversedMessageBlock]: position === Positions.RIGHT,
            })}
        >
            {position !== Positions.CENTER && (
                <Avatar
                    src='/static/images/thanks-for-registration/background.jpg'
                    sx={{ height: 35, width: 35 }}
                />
            )}
            <Typography
                variant='body1'
                component='h6'
                className={cn(styles.messageText, {
                    [styles.OurMessageBlock]: position === Positions.CENTER,
                })}
            >
                {text}
            </Typography>
        </div>
    );
};

export default MessageChat;
