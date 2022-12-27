import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import Header from '../Header';
import Footer from '../Footer';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
    children: React.ReactNode;
};

const MainLayout: React.FC<IProps> = ({ children, ...props }) => {
    return (
        <div className={styles.mainWrapper}>
            <Header {...props} />
            <div className={styles.content}>{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;
