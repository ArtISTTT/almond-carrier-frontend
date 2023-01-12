import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import Header from '../Header';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
    children: React.ReactNode;
};

const MainLayoutLogin: React.FC<IProps> = ({ children, ...props }) => {
    return (
        <div className={styles.mainWrapper}>
            <Header {...props} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default MainLayoutLogin;
