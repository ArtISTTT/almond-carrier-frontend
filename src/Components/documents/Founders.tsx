import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Founders.module.css';
import Founder from './Founder';

const founders = [
    {
        name: 'nikitaBogdankov',
        role: 'designer',
        image: '/static/images/founders/founderNikita.png',
        telegramLink: '@nikibog',
    },
    {
        name: 'artemGazukin',
        role: 'CEOCTOBackendDevFrontDev',
        image: '/static/images/founders/founderArtem.png',
        telegramLink: '@pBagueTT3',
    },
    {
        name: 'vadimChetoshnikov',
        role: 'frontendDeveloper',
        image: '/static/images/founders/founderVadim.png',
        telegramLink: '@NSPMSolyanka',
    },
];

const Founders = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.foundersWrapper}>
            <Typography variant='h3' component='h3' className={styles.ourTeam}>
                {t('ourTeam')}
            </Typography>

            <div className={styles.founders}>
                {founders.map(founder => (
                    <Founder
                        name={founder.name}
                        telegramLink={founder.telegramLink}
                        role={founder.role}
                        image={founder.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Founders;
