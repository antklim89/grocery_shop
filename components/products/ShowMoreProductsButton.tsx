import Link from 'next/link';
import { FC } from 'react';


const ShowMoreProductsButton: FC = () => {
    return (
        <div className="text-center my-3">
            <Link href="/product">
                <a className="btn btn-primary">
                    Shom more
                </a>
            </Link>
        </div>
    );
};

export default ShowMoreProductsButton;
