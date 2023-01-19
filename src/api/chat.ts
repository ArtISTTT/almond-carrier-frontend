import {
    IGetMessagesReturn,
    IPostMessage,
    IPostMessageReturn,
} from 'src/interfaces/api/chat';
import { mainInstance } from './instance';

export const getMessages = (orderId: string): Promise<IGetMessagesReturn> =>
    mainInstance
        .get('/chat', {
            params: { orderId },
        })
        .then(data => {
            return {
                ok: true,
                messages: data.data.messages,
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
): Promise<IPostMessageReturn> =>
    mainInstance
        .post(
            '/chat/post-message',
            JSON.stringify({
                messageText: requestData.messageText,
                orderId: requestData.orderId,
            })
        )
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
