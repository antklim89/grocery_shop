import Auth from '~/components/auth/Auth';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


export default function SignupPage(): JSX.Element {
    return (
        <ProtectedComponent authNeeded={false} redirect="back">
            <Seo title="Sign In" />
            <Auth isSignup />
        </ProtectedComponent>
    );
}
