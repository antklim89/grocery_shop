import Auth from '~/components/auth/Auth';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


const SignupPage = (): JSX.Element => {
    return (
        <ProtectedComponent authNeeded={false} redirect="back">
            <Seo description="Signup page." title="Sign In" />
            <Auth isSignup />
        </ProtectedComponent>
    );
};

export default SignupPage;
