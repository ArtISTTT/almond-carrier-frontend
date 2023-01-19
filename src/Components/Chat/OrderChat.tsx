import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/OrderChat.module.css';
import { useTranslation } from 'react-i18next';
import socketClient, { io } from 'socket.io-client';
import MessagesPanel from './MessagesPanel';
import { getMessages, postMessage } from 'src/api/chat';
import { IOrderFull } from 'src/interfaces/order';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URI as string;

console.log(SERVER);

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

    const initialize = async () => {
        await loadMessages();
        configureSocket();
    };

    React.useEffect(() => {
        initialize();
    }, []);

    const [messages, setMessages] = React.useState<any[]>([]);
    const [socket, setSocket] = React.useState<any>();
    const [socketChannel, setSocketChannel] = React.useState<any>(null);

    const configureSocket = () => {
        const socket = io(SERVER, { transports: ['websocket'] });

        socket.on('connected', () => {
            console.log('User just connected');
            socket.emit('connect-to-order', order.id);
        });

        socket.on('new-message', ({ message }: any) => {
            console.log('new', message);
            setMessages(messages.concat([message]));
        });

        setSocket(socket);
    };

    const loadMessages = async () => {
        const data = await getMessages(order.id);
        if (data.ok && data.messages) {
            setMessages(data.messages);
            console.log('load', messages);
        }
    };

    const handleSendMessage = async (text: string) => {
        const data = await postMessage({
            messageText: text,
            orderId: order.id,
        });
        console.log('send', data);

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
