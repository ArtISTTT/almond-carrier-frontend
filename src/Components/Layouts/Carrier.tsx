import {
    Avatar,
    Button,
    ClickAwayListener,
    Grow,
    Link as MUILink,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import React from 'react';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import styles from '../../../styles/CarierLayout.module.css';

const CarrierLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    const handleClose = () => setOpen(false);

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.leftMenu}>
                    <Avatar
                        sx={{ width: 60, height: 60 }}
                        src='/static/images/pre-logo.png'
                        alt='logo'
                        className={styles.logo}
                    />
                    <div>
                        <MUILink
                            className={styles.helpLink}
                            href='/forgot-password'
                            component={LinkBehaviour}
                        >
                            Hello
                        </MUILink>
                        <MUILink
                            className={styles.helpLink}
                            href='/forgot-password'
                            component={LinkBehaviour}
                        >
                            Hello 2
                        </MUILink>
                        <MUILink
                            className={styles.helpLink}
                            href='/forgot-password'
                            component={LinkBehaviour}
                        >
                            Hello 2
                        </MUILink>
                    </div>
                </div>
                <div className={styles.userPanel}>
                    <div
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        onClick={handleToggle}
                        className={styles.userName}
                    >
                        Person Name
                    </div>
                    <Avatar
                        className={styles.userAvatar}
                        sx={{ width: 40, height: 40 }}
                        src=''
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
                                        <ClickAwayListener
                                            onClickAway={handleClose}
                                        >
                                            <MenuList
                                                // autoFocusItem={open}
                                                id='menu-list-grow'
                                            >
                                                <MenuItem
                                                    className={styles.emailItem}
                                                    onClick={handleClose}
                                                >
                                                    <span>Person name</span>
                                                    <div>
                                                        nspmSoul16@gmail.com
                                                    </div>
                                                </MenuItem>
                                                <MenuItem
                                                    className={
                                                        styles.profileItem
                                                    }
                                                    onClick={handleClose}
                                                >
                                                    Profile
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    Settings
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    Billing
                                                </MenuItem>
                                                <MenuItem
                                                    className={
                                                        styles.logoutItem
                                                    }
                                                    onClick={handleClose}
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
                </div>
            </div>
            <div>{children}</div>
        </>
    );
};

export default CarrierLayout;