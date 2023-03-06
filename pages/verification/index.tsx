import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayoutLogin from 'src/Components/Layouts/MainLayoutLogin';
import PrivateLayout from 'src/Components/Layouts/Private';
import Verification from 'src/Components/Verification/Verification';
import { privateTypes } from 'src/interfaces/private';

const VerificationPage: React.FC = () => {
    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayoutLogin
                showContinueIfAuthorized={false}
                showSignInOutIfUnauthorized={false}
            >
                <Verification />
            </MainLayoutLogin>
        </PrivateLayout>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default VerificationPage;
