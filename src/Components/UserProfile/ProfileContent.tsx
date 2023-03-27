import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import { Tab, Tabs } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import { IGetUser } from 'src/interfaces/api/user';
import { LoaderColors } from 'src/interfaces/loader';
import { IOrder } from 'src/interfaces/order';
import { useLoadReviews } from 'src/redux/hooks/useLoadReviews';
import styles from '../../../styles/ProfileForNewUser.module.css';
import EmptyNoShadows from '../EmptyComponents/EmptyNoShadows';
import CircleLoader from '../Loaders/CircleLoader';
import ReviewItem from '../MyProfile/ReviewItem';

enum profileContent {
    ORDERS = 0,
    REVIEWS = 1,
}

interface IProps {
    user: IGetUser;
    setApplyedOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
}

const ProfileConent: React.FC<IProps> = ({ user, setApplyedOrder }) => {
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
        return <CircleLoader color={LoaderColors.PRIMARY} />;
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
                        user.successOrders.map((order: IOrder) => (
                            <OrderItem
                                setApplyedOrder={setApplyedOrder}
                                isOrderFromUserPage={true}
                                key={order.id}
                                order={order}
                            />
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
