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
import { useRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';
import { SocketIoContext } from '../Layouts/SocketIo';

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

function useChatScroll<T>(dep: T): React.RefObject<HTMLDivElement> {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);

    return ref;
}

const OrderChat: React.FC<IProps> = ({
    user,
    order,
    viewType,
    updateOrder,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const router = useRouter();
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const socket = useContext(SocketIoContext);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [isMessagesLoading, setIsMessagesLoading] =
        React.useState<boolean>(false);
    const messagesPanelRef = useChatScroll(messages);

    const initialize = async () => {
        await loadMessages();
        configureSocket();
    };

    React.useEffect(() => {
        initialize();

        return () => {
            socket?.emit('disconnect-from-order', order.id);
        };
    }, []);

    const person =
        viewType === ViewType.carrier ? order.receiver : order.carrier;

    const myData =
        viewType === ViewType.carrier ? order.carrier : order.receiver;

    const dialogPesron = React.useMemo(() => {
        const personId =
            viewType === ViewType.carrier
                ? order.receiver?.id
                : order.carrier?.id;

        return { person: `${person?.firstName} ${person?.lastName}`, personId };
    }, [viewType, order.carrier, order.receiver]);

    const configureSocket = () => {
        if (socket && socket.connected) {
            socket.emit('connect-to-order', order.id);

            socket.on(
                'new-message',
                ({ message }: { message: IMessageServer }) => {
                    setMessages(prev =>
                        prev.concat(parseMessages(user.id, [message]))
                    );
                }
            );

            socket.on('new-status', async () => {
                await updateOrder();
            });
        }
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

        if (!data.ok) {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSendMessage'),
            });
        }
    };

    const navigateToUserPage = (): void => {
        router.push({
            pathname: navigateTo.USER,
            query: { userId: dialogPesron.personId },
        });
    };

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>
                <div onClick={navigateToUserPage} className={styles.chatPerson}>
                    <Avatar
                        sx={{ height: 50, width: 50 }}
                        src={person?.avatar}
                        className={styles.avatar}
                    />
                    <div className={styles.chatMember}>
                        <Typography
                            className={styles.chatMemberName}
                            variant='h6'
                            component='h6'
                        >
                            {dialogPesron.person}
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
            </div>
            <MessagesPanel
                personAvatar={person?.avatar}
                myDataAvatar={myData?.avatar}
                orderStatus={order.status}
                errorMessage={errorMessage}
                loadMessages={loadMessages}
                isMessagesLoading={isMessagesLoading}
                messages={messages}
                onSendMessage={handleSendMessage}
                messagesPanelRef={messagesPanelRef}
            />
        </div>
    );
};

export default OrderChat;
