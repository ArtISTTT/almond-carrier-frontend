import { Tab, Tabs } from '@mui/material';
import React from 'react';
import styles from '../../../styles/Profile.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import RestoreIcon from '@mui/icons-material/Restore';

const ProfileNavbar: React.FC = () => {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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
