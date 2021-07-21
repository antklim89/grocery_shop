import Link from 'next/link';


export default function ShowMoreProductsButton(): JSX.Element {
    return (
        <div className="text-center my-3">
            <Link href="/products">
                <a className="btn btn-primary">
                    Shom more
                </a>
            </Link>
        </div>
    );
}
