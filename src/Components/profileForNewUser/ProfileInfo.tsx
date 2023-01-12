import { Button, Avatar, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../../styles/ProfileForNewUser.module.css';
import { Container } from '@mui/system';

const ProfileInfo = () => {
    return (
        <div className={styles.wrapper}>
            <Container className={styles.profileInfoContainer} maxWidth={false}>
                <div className={styles.profileBlock}>
                    <div className={styles.profileCard}>
                        <Avatar
                            src='/static/images/signin-image.png'
                            sx={{ width: 140, height: 140 }}
                        />
                        <div className={styles.profileCardInfo}>
                            <Typography
                                className={styles.profileName}
                                variant='h3'
                                component='h3'
                            >
                                name surname
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                From: <span></span>
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                Often flies to: <span></span>
                            </Typography>
                            <Typography
                                className={styles.profileCardItem}
                                variant='h6'
                                component='h5'
                            >
                                Currency:<span></span>
                            </Typography>
                        </div>
                    </div>
                    <Rating
                        className={styles.profileRating}
                        name='half-rating'
                        defaultValue={4.5}
                        readOnly
                        precision={0.5}
                    />
                </div>
                <div className={styles.confirmBlock}>
                    <Typography
                        variant='h6'
                        component='h5'
                        className={styles.confirmItem}
                    >
                        Email{' '}
                        <CheckCircleIcon
                            sx={{ color: 'green', width: 18, height: 18 }}
                        />
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h5'
                        className={styles.confirmItem}
                    >
                        Phone number{' '}
                        <CheckCircleIcon
                            sx={{ color: 'green', width: 18, height: 18 }}
                        />
                    </Typography>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            All orders
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            16 orders
                        </Typography>
                        <Typography
                            variant='h6'
                            component='h6'
                            className={styles.secondInfoParam}
                        >
                            <span>Carrier</span>: 12 / <span>Receiver</span>: 4
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            Completion Rate
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            89%
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            Activity in Last 30 days
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            4 orders
                        </Typography>
                    </div>
                    <div className={styles.infoItem}>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoTitle}
                        >
                            Average Completion Time
                        </Typography>
                        <Typography
                            variant='h4'
                            component='h4'
                            className={styles.infoParam}
                        >
                            18 days
                        </Typography>
                    </div>
                </div>
                <Button className={styles.profileButton} variant='contained'>
                    Request carrier service
                </Button>
            </Container>
        </div>
    );
};

export default ProfileInfo;
