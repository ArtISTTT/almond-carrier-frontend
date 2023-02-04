import { Avatar, Typography } from '@mui/material';
import React, { useContext } from 'react';
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
import { OpenAlertContext } from '../Layouts/Snackbar';

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
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const initialize = async () => {
        await loadMessages();
        configureSocket();
    };

    React.useEffect(() => {
        initialize();
    }, []);

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [socket, setSocket] = React.useState<Socket | null>(null);

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
        const data = await getMessages(order.id);

        if (data.ok && data.messages) {
            setMessages(parseMessages(user.id, data.messages));
        }
    };

    const handleSendMessage = async (text: string) => {
        const data = await postMessage({
            messageText: text,
            orderId: order.id,
        });

        if (!data.ok) {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSendMessage'),
            });
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
                    <Typography
                        className={styles.chatMemberOnline}
                        variant='subtitle2'
                        component='h6'
                    >
                        {/* {t('lastSeenOnline')} 15m {t('ago')} */}
                    </Typography>
                </div>
            </div>
            <MessagesPanel
                messages={messages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default OrderChat;
