import {
    Avatar,
    FormControl,
    InputLabel,
    Link as MUILink,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    return (
        <>
            {children}
            <footer className={styles.footer}>
                <div className={styles.leftBlock}>
                    <div>
                        <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel id='demo-simple-select-helper-label'>
                                Language
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-helper-label'
                                id='demo-simple-select-helper'
                                value={language}
                                label='Language'
                                onChange={handleChange}
                            >
                                <MenuItem value={'Russian'}>Russian</MenuItem>
                                <MenuItem value={'English'}>English</MenuItem>
                            </Select>
                        </FormControl>
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
                    <img
                        src='/static/images/footer-icons/telegram-logo.svg'
                        alt='telegram'
                    />
                    <img
                        src='/static/images/footer-icons/instagram-logo.svg'
                        alt='instagram'
                    />
                    <img
                        src='/static/images/footer-icons/vk-logo.svg'
                        alt='vk'
                    />
                    <img
                        src='/static/images/footer-icons/gmail-logo.svg'
                        alt='gmail'
                    />
                </div>
            </footer>
        </>
    );
};

export default MainLayout;
