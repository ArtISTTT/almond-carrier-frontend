import React from 'react';
import Footer from '../Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {children}
            <Footer />
        </>
    );
};

export default MainLayout;
