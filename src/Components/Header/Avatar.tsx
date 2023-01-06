import {
    Avatar,
    ClickAwayListener,
    Grow,
    Link as MUILink,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import { signOut } from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/selectors/user';
import { useRouter } from 'next/router';
import SettingsPopup from '../settings/SettingsPopup';
import { setIsAuthorized } from '../../redux/slices/userSlice';

const HeaderAvatar: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [isSettingsPopupOpen, setIsSettingsPopupOpen] =
        React.useState<boolean>(false);
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const anchorRef = React.useRef(null);

    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    const handleClose = () => setOpen(false);

    const handleOpenSettingsPopup = () => {
        setOpen(false);
        setIsSettingsPopupOpen(prev => !prev);
    };

    const goToProfile = () => {
        router.push('/profile/orders');
    };

    const handleSignOut = async () => {
        const data = await signOut();

        if (data.ok) {
            dispatch(setIsAuthorized(false));
            router.push('/');
        } else {
            console.log('Sign out error');
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
            <div>
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
                                    <MenuList
                                        // autoFocusItem={open}
                                        id='menu-list-grow'
                                    >
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
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleOpenSettingsPopup}
                                        >
                                            Settings
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            Billing
                                        </MenuItem>
                                        <MenuItem
                                            className={styles.logoutItem}
                                            onClick={handleSignOut}
                                        >
                                            Log out
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </>
    );
};

export default HeaderAvatar;
