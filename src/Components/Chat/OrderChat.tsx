import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/OrderChat.module.css';
import { useTranslation } from 'react-i18next';
import socketClient from 'socket.io-client';
import MessagesPanel from './MessagesPanel';
import { getMessages, postMessage } from 'src/api/chat';
import { IOrderFull } from 'src/interfaces/order';

const SERVER = 'http://127.0.0.1:8000';

interface IProps {
    user: IUser;
    order: IOrderFull;
}
interface ISocketChannel {
    senderName: string;
    id: number;
    text: string;
    channel_id: number;
}

export enum Positions {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center',
}

const OrderChat: React.FC<IProps> = ({ user, order }) => {
    const { t } = useTranslation();

    React.useEffect(() => {
        loadMessages();
        configureSocket();
    }, []);

    const [messages, setMessages] = React.useState<any>(null);
    const [socket, setSocket] = React.useState<any>(socketClient(SERVER));
    const [socketChannel, setSocketChannel] = React.useState<any>(null);

    const configureSocket = () => {
        // socket.on('connection', () => {
        //     if (socketChannel) {
        //         handleChannelSelect(socketChannel?.id);
        //     }
        // });
        // socket.on('channel', (channel: any) => {
        //     socketChannels?.forEach((chan: any) => {
        //         if (chan.id === channel.id) {
        //             chan.participants = channel.participants;
        //         }
        //     });
        //     setSocketChannels(socketChannels);
        // });
        // socket.on('message', (message: any) => {
        //     socketChannels?.forEach((chan: any) => {
        //         if (chan.id === message.channel_id) {
        //             if (!chan.messages) {
        //                 chan.messages = [message];
        //             } else {
        //                 chan.messages.push(message);
        //             }
        //         }
        //     });
        //     setSocketChannels(socketChannels);
        // });
        setSocket(socket);
    };

    const loadMessages = async () => {
        const data = await getMessages(order.id);
        setMessages(data.messages);
    };

    const handleSendMessage = (text: string) => {
        const data = postMessage({ messageText: text, orderId: order.id });

        // socket.emit('send-message', {
        //     channel_id,
        //     text,
        //     senderName: socket.id,
        //     id: Date.now(),
        // });
    };

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
            <MessagesPanel onSendMessage={handleSendMessage} />
        </div>
    );
};

export default OrderChat;
