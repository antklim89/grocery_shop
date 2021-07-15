import Signin from '~/components/auth/Signin';
import Seo from '~/components/utils/Seo';


export default function signin(): JSX.Element {
    return (
        <>
            <Seo title="Sign In" />
            <Signin />
        </>
    );
}
