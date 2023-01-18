import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/OrderChat.module.css';
import { useTranslation } from 'react-i18next';
import socketClient from 'socket.io-client';
import MessagesPanel from './MessagesPanel';

const SERVER = 'http://127.0.0.1:8000';

interface IProps {
    user: IUser;
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

const OrderChat: React.FC<IProps> = ({ user }) => {
    const { t } = useTranslation();

    React.useEffect(() => {
        loadChannels();
        configureSocket();
    }, []);

    const [socketChannels, setSocketChannels] = React.useState<any>(null);
    const [socket, setSocket] = React.useState<any>(socketClient(SERVER));
    const [socketChannel, setSocketChannel] = React.useState<any>(null);

    const configureSocket = () => {
        socket.on('connection', () => {
            if (socketChannel) {
                handleChannelSelect(socketChannel?.id);
            }
        });
        socket.on('channel', (channel: any) => {
            socketChannels?.forEach((chan: any) => {
                if (chan.id === channel.id) {
                    chan.participants = channel.participants;
                }
            });
            setSocketChannels(socketChannels);
        });
        socket.on('message', (message: any) => {
            socketChannels?.forEach((chan: any) => {
                if (chan.id === message.channel_id) {
                    if (!chan.messages) {
                        chan.messages = [message];
                    } else {
                        chan.messages.push(message);
                    }
                }
            });
            setSocketChannels(socketChannels);
        });
        setSocket(socket);
    };

    const loadChannels = async () => {
        fetch(`${SERVER}/getChannels`).then(async response => {
            let data = await response.json();
            setSocketChannels(data.channels);
        });
        // fetch(`${SERVER}/getChannel`).then(async response => {
        //     let data = await response.json();
        //     setSocketChannel(data.channel);
        // });
    };

    const handleChannelSelect = (id: number) => {
        let channel = socketChannels.find((c: any) => {
            return c.id === id;
        });
        setSocketChannel(channel);
        socket.emit('channel-join', id, (ack: any) => {});
    };

    const handleSendMessage = (channel_id: number, text: string) => {
        socket.emit('send-message', {
            channel_id,
            text,
            senderName: socket.id,
            id: Date.now(),
        });
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
            <MessagesPanel
                onSendMessage={handleSendMessage}
                channel={socketChannel}
            />
        </div>
    );
};

export default OrderChat;
