import Seo from '~/components/utils/Seo';


const NotFoundPage = (): JSX.Element => {
    return (
        <>
            <Seo title="Page Not Found" />
            <div className="position-absolute top-50 start-50 translate-middle">
                <span className="h1">
                    404 | PAGE NOT FOUND
                </span>
            </div>
        </>
    );
};

export default NotFoundPage;
