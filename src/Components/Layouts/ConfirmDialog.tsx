import React, { createContext } from 'react';
import {
    Alert,
    Button,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type ITriggerOpen = {
    text: string;
    completeCallBack: () => void;
};
interface IProps {
    children: React.ReactNode;
}

export const OpenDialogContext = createContext({
    triggerDialogOpen: (props: ITriggerOpen) => {},
});

const ConfirmDialogLayout: React.FC<IProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    const { t } = useTranslation();

    const [data, setData] = React.useState<ITriggerOpen>({
        text: '',
        completeCallBack: () => {},
    });

    const triggerDialogOpen = (props: ITriggerOpen) => {
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

    const handleCloseConfirm = () => {
        data.completeCallBack();
        setOpen(false);
    };

    return (
        <>
            <OpenDialogContext.Provider value={{ triggerDialogOpen }}>
                {children}
            </OpenDialogContext.Provider>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {t('warning')}
                </DialogTitle>
                <DialogContent>{t(data.text)}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>{t('yes')}</Button>
                    <Button onClick={handleClose}>{t('no')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDialogLayout;
