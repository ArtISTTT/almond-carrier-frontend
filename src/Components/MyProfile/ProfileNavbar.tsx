import MenuIcon from '@mui/icons-material/Menu';
import RestoreIcon from '@mui/icons-material/Restore';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Profile.module.css';

const selectTab = (link: string) => {
    switch (link) {
        case '/profile/general':
            return 0;
        case '/profile/orders':
            return 1;
        case '/profile/reviews':
            return 2;
        case '/profile/verification':
            return 3;
        default:
            return 0;
    }
};

const selectTabHref = (index: number) => {
    switch (index) {
        case 0:
            return '/profile/general';
        case 1:
            return '/profile/orders';
        case 2:
            return '/profile/reviews';
        case 3:
            return '/profile/verification';
        default:
            return '/profile/general';
    }
};

const ProfileNavbar: React.FC = () => {
    const router = useRouter();
    const [value, setValue] = React.useState<number>(
        selectTab(router.pathname)
    );
    const { t } = useTranslation();

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setTimeout(() => router.push(selectTabHref(newValue)), 200);
    };

    return (
        <div>
            <div className={styles.vertical}>
                <Tabs
                    className={styles.tabs}
                    value={value}
                    onChange={handleChange}
                    orientation='vertical'
                    aria-label='profile tabs'
                >
                    <Tab
                        icon={<MenuIcon />}
                        iconPosition='start'
                        label={t('myInfo')}
                    />
                    <Tab
                        icon={<RestoreIcon />}
                        iconPosition='start'
                        label={t('myOrders')}
                    />
                    <Tab
                        icon={<StarIcon />}
                        iconPosition='start'
                        label={t('reviews')}
                    />
                    <Tab
                        icon={<VerifiedIcon />}
                        iconPosition='start'
                        label={t('verification')}
                        className={styles.verificationTab}
                    />
                </Tabs>
            </div>
            <div className={styles.horizontal}>
                <Tabs
                    className={styles.tabs}
                    value={value}
                    onChange={handleChange}
                    orientation='horizontal'
                    aria-label='profile tabs'
                >
                    <Tab
                        icon={<MenuIcon />}
                        iconPosition='start'
                        label={t('myInfo')}
                        className={styles.tab}
                    />
                    <Tab
                        icon={<RestoreIcon />}
                        iconPosition='start'
                        label={t('myOrders')}
                        className={styles.tab}
                    />
                    <Tab
                        icon={<StarIcon />}
                        iconPosition='start'
                        label={t('reviews')}
                        className={styles.tab}
                    />
                    <Tab
                        icon={<VerifiedIcon />}
                        iconPosition='start'
                        label={t('verification')}
                        className={styles.verificationTab}
                    />
                </Tabs>
            </div>
        </div>
    );
};

export default ProfileNavbar;
