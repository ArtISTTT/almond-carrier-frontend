import React from 'react';
import { Container } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../../../styles/ProfileForNewUser.module.css';
import { useAppSelector } from '../../redux/hooks';
import { selectMyOrders } from '../../redux/selectors/orders';
import ReviewItem from '../Profile/ReviewItem';
import dayjs from 'dayjs';
import OrderItem from '../Orders/OrderItem';
import EmptyNoShadows from '../EmptyComponents/EmptyNoShadows';
import { IReview } from '../../interfaces/profile';

const reviews: IReview[] = [
    {
        id: 1,
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 993,
        date: dayjs('2019-01-25'),
    },
    {
        id: 2,
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 993,
        date: dayjs('2019-01-25'),
    },
    {
        id: 3,
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 993,
        date: dayjs('2019-01-25'),
    },
    {
        id: 4,
        avatar: 'P',
        name: 'Sarah',
        role: 'Receiver',
        text: 'Very Good, Dastin Fantastish',
        rating: 4,
        benefit: 993,
        date: dayjs('2019-01-25'),
    },
];

enum profileContent {
    ORDERS = 0,
    REVIEWS = 1,
}

const ProfileConent: React.FC = () => {
    const [content, setContent] = React.useState<profileContent>(
        profileContent.ORDERS
    );

    const orders = useAppSelector(selectMyOrders);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setContent(newValue);
    };

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
                        label='current orders'
                    />
                    <Tab
                        icon={<StarIcon />}
                        iconPosition='start'
                        label='Feedback'
                    />
                </Tabs>
                <div className={styles.contentItems}>
                    {orders.length > 0 &&
                        content === profileContent.ORDERS &&
                        orders.map((order, i) => (
                            <OrderItem key={i} {...order} />
                        ))}
                    {orders.length === 0 &&
                        content === profileContent.ORDERS && (
                            <EmptyNoShadows text={'userHaveNoOrdersYet'} />
                        )}

                    {reviews.length > 0 &&
                        content === profileContent.REVIEWS &&
                        reviews.map(review => (
                            <ReviewItem key={review.id} {...review} />
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