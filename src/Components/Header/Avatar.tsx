import {
    Avatar,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { navigateTo } from 'src/interfaces/navigate';
import styles from '../../../styles/mainLayout.module.css';
import { signOut } from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/selectors/user';
import { setIsAuthorized } from '../../redux/slices/userSlice';
import { OpenAlertContext } from '../Layouts/Snackbar';
import SettingsPopup from '../SettingsPopup/SettingsPopup';

interface IProps {
    isSettingsPopupOpen: boolean;
    setIsSettingsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderAvatar: React.FC<IProps> = ({
    isSettingsPopupOpen,
    setIsSettingsPopupOpen,
}) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const anchorRef = React.useRef(null);
    const { triggerOpen } = useContext(OpenAlertContext);
    const { t } = useTranslation();

    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    const handleClose = () => setOpen(false);

    const handleOpenSettingsPopup = () => {
        setOpen(false);
        setIsSettingsPopupOpen(prev => !prev);
    };

    const goToProfile = () => {
        router.push(navigateTo.PROFILE_GENERAL);
    };

    const navigateToBilling = () => {
        router.push(navigateTo.PAYOUTS);
        setOpen(false);
    };

    const handleSignOut = async () => {
        const data = await signOut();

        if (data.ok) {
            dispatch(setIsAuthorized(false));
            router.push(navigateTo.LANDING);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('signOutError'),
            });
        }
    };

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            {isSettingsPopupOpen && (
                <SettingsPopup
                    setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                />
            )}
            <Avatar
                className={styles.userAvatar}
                sx={{ width: 40, height: 40 }}
                src={user.avatar ?? ''}
                alt='logo'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
            />

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                        className={styles.growMenu}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id='menu-list-grow'>
                                    <MenuItem
                                        className={styles.emailItem}
                                        onClick={handleClose}
                                    >
                                        <span>
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <div>{user.email}</div>
                                    </MenuItem>
                                    <MenuItem
                                        className={styles.profileItem}
                                        onClick={goToProfile}
                                    >
                                        {t('profile')}
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenSettingsPopup}>
                                        {t('settings')}
                                    </MenuItem>
                                    <MenuItem onClick={navigateToBilling}>
                                        {t('payouts')}
                                    </MenuItem>
                                    <MenuItem
                                        className={styles.logoutItem}
                                        onClick={handleSignOut}
                                    >
                                        {t('logOut')}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default HeaderAvatar;
