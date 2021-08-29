import Auth from '~/components/auth/Auth';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


const LoginPage = (): JSX.Element => {
    return (
        <ProtectedComponent authNeeded={false} redirect="back">
            <Seo description="Login page." title="Login" />
            <Auth />
        </ProtectedComponent>
    );
};

export default LoginPage;
