import { Tab, Tabs } from '@mui/material';
import React from 'react';
import styles from '../../../styles/Profile.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import RestoreIcon from '@mui/icons-material/Restore';
import { useRouter } from 'next/router';

const selectTab = (link: string) => {
    switch (link) {
        case '/profile/general':
            return 0;
        case '/profile/orders':
            return 1;
        case '/profile/reviews':
            return 2;
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
        default:
            return '/profile/general';
    }
};

const ProfileNavbar: React.FC = () => {
    const router = useRouter();
    const [value, setValue] = React.useState<number>(
        selectTab(router.pathname)
    );

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(selectTabHref(newValue));
    };

    return (
        <Tabs
            className={styles.tabs}
            value={value}
            onChange={handleChange}
            aria-label='profile tabs'
        >
            <Tab
                icon={<MenuIcon />}
                iconPosition='start'
                label='My Information'
            />
            <Tab
                icon={<RestoreIcon />}
                iconPosition='start'
                label='My Orders'
            />
            <Tab icon={<StarIcon />} iconPosition='start' label='Reviews' />
            <Tab
                icon={<SettingsIcon />}
                iconPosition='start'
                label='Settings'
            />
        </Tabs>
    );
};

export default ProfileNavbar;
