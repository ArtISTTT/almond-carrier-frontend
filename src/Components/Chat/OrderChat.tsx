import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { IUser } from 'src/interfaces/user';
import styles from '../../../styles/OrderChat.module.css';
import { useTranslation } from 'react-i18next';
import { Socket, io } from 'socket.io-client';
import MessagesPanel from './MessagesPanel';
import { getMessages, postMessage } from 'src/api/chat';
import { IOrderFull } from 'src/interfaces/order';
import { parseMessages } from 'src/helpers/parseMessages';
import { IMessage, IMessageServer } from 'src/interfaces/chat';
import { ViewType } from '../OrderPage/OrderInputItem';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URI as string;
interface IProps {
    user: IUser;
    order: IOrderFull;
    viewType: ViewType;
    updateOrder: (withoutLoading?: true) => Promise<void>;
}

export enum Positions {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center',
}

const OrderChat: React.FC<IProps> = ({
    user,
    order,
    viewType,
    updateOrder,
}) => {
    // const { t } = useTranslation();

    const initialize = async () => {
        await loadMessages();
        configureSocket();
    };

    React.useEffect(() => {
        initialize();
    }, []);

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [isMessagesLoading, setIsMessagesLoading] =
        React.useState<boolean>(false);

    const dialogPesron = React.useMemo(() => {
        const person =
            viewType === ViewType.carrier ? order.receiver : order.carrier;

        return `${person?.firstName} ${person?.lastName}`;
    }, [viewType, order.carrier, order.receiver]);

    const configureSocket = () => {
        const socket = io(SERVER, {
            transports: ['websocket'],
            forceNew: true,
        });

        socket.on('connected', () => {
            socket.emit('connect-to-order', order.id);
        });

        socket.on('new-message', ({ message }: { message: IMessageServer }) => {
            setMessages(prev => prev.concat(parseMessages(user.id, [message])));
        });

        socket.on('new-status', async () => {
            await updateOrder();
        });

        setSocket(socket);
    };

    const loadMessages = async () => {
        setIsMessagesLoading(true);
        const data = await getMessages(order.id);

        if (data.ok && data.messages) {
            setMessages(parseMessages(user.id, data.messages));
            setIsMessagesLoading(false);
        }
        if (data.error) {
            setErrorMessage(data.error);
            setIsMessagesLoading(false);
        }
    };

    const handleSendMessage = async (text: string) => {
        const data = await postMessage({
            messageText: text,
            orderId: order.id,
        });

        if (data.ok) {
            return;
        }
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
                        {dialogPesron}
                    </Typography>
                    {/* <Typography
                        className={styles.chatMemberOnline}
                        variant='subtitle2'
                        component='h6'
                    >
                        {t('lastSeenOnline')} 15m {t('ago')}
                    </Typography> */}
                </div>
            </div>
            <MessagesPanel
                errorMessage={errorMessage}
                loadMessages={loadMessages}
                isMessagesLoading={isMessagesLoading}
                messages={messages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default OrderChat;
