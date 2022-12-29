import styles from '../../styles/Footer.module.css';
import React from 'react';
import {
    Avatar,
    Link as MUILink,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

const languages = [{ label: 'Russian' }, { label: 'English' }];

const Footer = () => {
    const [language, setLanguage] = React.useState<string>('Russian');

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.leftBlock}>
                <FormControl sx={{ width: 250 }}>
                    <InputLabel id='language-label'>Language</InputLabel>
                    <Select
                        labelId='language-label'
                        id='demo-simple-select'
                        value={language}
                        label='Language'
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Russian'}>Russian</MenuItem>
                        <MenuItem value={'English'}>English</MenuItem>
                    </Select>
                </FormControl>
                <Avatar
                    sx={{ width: 55, height: 55 }}
                    src='/static/images/logo.png'
                    alt='logo'
                />
            </div>
            <div className={styles.centerBlock}>
                <div className={styles.centerBlockInner}>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            Resources
                        </Typography>
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
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            Product
                        </Typography>
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
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            Company
                        </Typography>
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
    );
};

export default Footer;
