import {
    IGetMessagesReturun,
    IPostMessage,
    IPostMessageReturun,
} from 'src/interfaces/api/chat';
import { mainInstance } from './instance';

export const getMessages = (orderId: string): Promise<IGetMessagesReturun> =>
    mainInstance
        .get('/chat', {
            params: { orderId },
        })
        .then(data => {
            return {
                ok: true,
                chatMessages: data.data,
            };
        })
        .catch(() => {
            return {
                ok: false,
                error: 'Error',
            };
        });

export const postMessage = (
    requestData: IPostMessage
): Promise<IPostMessageReturun> =>
    mainInstance
        .post('/api/chat/post-message', {
            params: {
                messageText: requestData.messageText,
                orderId: requestData.orderId,
            },
        })
        .then(data => {
            return {
                ok: true,
                message: data.data.message,
            };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });
