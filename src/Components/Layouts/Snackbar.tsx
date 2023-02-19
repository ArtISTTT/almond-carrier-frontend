import React, { createContext } from 'react';
import { useRouter } from 'next/router';
import MainLayout from './MainLayout';
import { Alert, AlertProps, Snackbar } from '@mui/material';

type ITriggerOpen = {
    severity: AlertProps['severity'];
    text: string;
};

export const OpenAlertContext = createContext({
    triggerOpen: (props: ITriggerOpen) => {},
});
interface IProps {
    children: React.ReactNode;
}

const SnackBarLayout: React.FC<IProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<ITriggerOpen>({
        text: '',
        severity: 'success',
    });

    const triggerOpen = (props: ITriggerOpen) => {
        setData(props);
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <>
            <OpenAlertContext.Provider value={{ triggerOpen }}>
                {children}
            </OpenAlertContext.Provider>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={data.severity}
                    sx={{ width: '100%' }}
                >
                    {data.text}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackBarLayout;
