import Auth from '~/components/auth/Auth';
import Seo from '~/components/utils/Seo';


export default function SignupPage(): JSX.Element {
    return (
        <>
            <Seo title="Sign In" />
            <Auth isSignup />
        </>
    );
}
