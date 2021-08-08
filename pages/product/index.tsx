
import ProductsBlock from '~/components/products/ProductsBlock';
import Seo from '~/components/utils/Seo';


export default function ProductsPage(): JSX.Element {
    return (
        <>
            <Seo title="Products" />
            <ProductsBlock />
        </>
    );
}
