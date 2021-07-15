import Login from '~/components/auth/Login';
import Seo from '~/components/utils/Seo';


export default function login(): JSX.Element {
    return (
        <>
            <Seo title="Login" />
            <Login />
        </>
    );
}
