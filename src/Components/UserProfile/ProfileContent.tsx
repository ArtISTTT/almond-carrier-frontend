import React from 'react';
import { Container } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../../../styles/ProfileForNewUser.module.css';
import ReviewItem from '../MyProfile/ReviewItem';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import EmptyNoShadows from '../EmptyComponents/EmptyNoShadows';
import { IGetUser } from 'src/interfaces/api/user';
import { useTranslation } from 'react-i18next';
import { useLoadReviews } from 'src/redux/hooks/useLoadReviews';
import ReviewsLoader from '../Loaders/ReviewsLoader';

enum profileContent {
    ORDERS = 0,
    REVIEWS = 1,
}

const ProfileConent = ({ user }: { user: IGetUser }) => {
    const [content, setContent] = React.useState<profileContent>(
        profileContent.ORDERS
    );
    const { reload, isLoading, error, reviews } = useLoadReviews(user.id);

    const { t } = useTranslation();

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setContent(newValue);
    };

    React.useEffect(() => {
        reload();
    }, []);

    if (isLoading) {
        return <ReviewsLoader />;
    }

    return (
        <div className={styles.contentWrapper}>
            <Container className={styles.contentContainer} maxWidth={false}>
                <Tabs
                    value={content}
                    onChange={handleChange}
                    aria-label='icon position tabs example'
                    className={styles.contentTabs}
                >
                    <Tab
                        icon={<PersonIcon />}
                        iconPosition='start'
                        label={t('currentOrders') as string}
                        className={styles.tab}
                    />
                    <Tab
                        icon={<StarIcon />}
                        iconPosition='start'
                        label={t('feedback') as string}
                        className={styles.tab}
                    />
                </Tabs>
                <div className={styles.contentItems}>
                    {user.successOrders.length > 0 &&
                        content === profileContent.ORDERS &&
                        user.successOrders.map(order => (
                            <OrderItem key={order.id} {...order} />
                        ))}
                    {user.successOrders.length === 0 &&
                        content === profileContent.ORDERS && (
                            <EmptyNoShadows text={'userHaveNoOrdersYet'} />
                        )}

                    {reviews.length > 0 &&
                        content === profileContent.REVIEWS &&
                        reviews.map(review => (
                            <ReviewItem key={review._id} {...review} />
                        ))}
                    {reviews.length === 0 &&
                        content === profileContent.REVIEWS && (
                            <EmptyNoShadows text={'userHaveNoReviewsYet'} />
                        )}
                </div>
            </Container>
        </div>
    );
};

export default ProfileConent;
