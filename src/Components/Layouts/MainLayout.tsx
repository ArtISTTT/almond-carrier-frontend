import {
    Autocomplete,
    Avatar,
    Link as MUILink,
    TextField,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';

const languages = [{ label: 'Russian' }, { label: 'English' }];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inputValue, setInputValue] = React.useState<string | undefined>('');

    const onInputChange = (event: any, newInputValue: string) => {
        setInputValue(newInputValue);
    };

    return (
        <>
            {children}
            <footer className={styles.footer}>
                <div className={styles.leftBlock}>
                    <div>
                        <Autocomplete
                            inputValue={inputValue}
                            onInputChange={onInputChange}
                            disablePortal
                            id='combo-box-demo'
                            options={languages}
                            sx={{ width: 300 }}
                            renderInput={params => (
                                <TextField {...params} label='Language' />
                            )}
                        />
                    </div>
                    <Avatar
                        sx={{ width: 55, height: 55 }}
                        src='/static/images/logo.png'
                        alt='logo'
                    />
                </div>
                <div className={styles.centerBlock}>
                    <div className={styles.centerColumn}>
                        <div className={styles.columnTitle}>Resources</div>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                    <div className={styles.centerColumn}>
                        <div className={styles.columnTitle}>Product</div>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                    <div className={styles.centerColumn}>
                        <div className={styles.columnTitle}>Company</div>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <MUILink href='#'>
                        <EmailIcon className={styles.footerIcon} />
                    </MUILink>
                    <MUILink href='#'>
                        <TelegramIcon className={styles.footerIcon} />
                    </MUILink>
                    <MUILink href='#'>
                        <InstagramIcon className={styles.footerIcon} />
                    </MUILink>
                </div>
            </footer>
        </>
    );
};

export default MainLayout;