import React, { createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from './MainLayout';
import { Alert, AlertProps, Snackbar } from '@mui/material';
import { Socket, io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/selectors/user';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URI as string;

interface IProps {
    children: React.ReactNode;
}

export const SocketIoContext = createContext<Socket | null>(null);

const SocketIoLayout: React.FC<IProps> = ({ children }) => {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const user = useSelector(selectUser);

    const initialize = () => {
        if (user) {
            const socket = io(SERVER, {
                transports: ['websocket'],
                forceNew: true,
            });

            socket.on('connected', () => {
                socket.emit('connect-to-client', user.id);
            });

            setSocket(socket);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <SocketIoContext.Provider value={socket}>
            {children}
        </SocketIoContext.Provider>
    );
};

export default SocketIoLayout;