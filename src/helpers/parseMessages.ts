import dayjs from 'dayjs';
import { IMessage, IMessageServer, MessageType } from 'src/interfaces/chat';

export const parseMessages = (
    userId: string,
    messages: IMessageServer[]
): IMessage[] =>
    messages.map(message => ({
        messageText: message.messageText,
        createdAt: dayjs(message.createdAt),
        postedUserId: message.postedUserId,
        readByRecipients: message.readByRecipients,
        type:
            userId === message.postedUserId
                ? MessageType.Mine
                : MessageType.Other,
    }));
