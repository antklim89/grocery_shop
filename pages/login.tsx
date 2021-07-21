import Auth from '~/components/auth/Auth';
import Seo from '~/components/utils/Seo';


export default function LoginPage(): JSX.Element {
    return (
        <>
            <Seo title="Login" />
            <Auth />
        </>
    );
}
