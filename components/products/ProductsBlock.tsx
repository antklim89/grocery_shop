import { FC } from 'react';
import { ReactNode } from 'react-markdown';


interface Props {
    catalog: ReactNode
    productsList: ReactNode
}

const ProductsBlock: FC<Props> = ({ catalog, productsList }) => {
    return (
        <>
            <div className="container d-block d-xl-none">
                <button
                    className="btn btn-primary"
                    data-bs-target="#catalog-offcanvas"
                    data-bs-toggle="offcanvas"
                    type="button"
                >
                    OPEN CATALOG
                </button>
                <div
                    aria-labelledby="offcanvasCalalogLabel"
                    className="offcanvas offcanvas-start"
                    id="catalog-offcanvas"
                    tabIndex={-1}
                >
                    <div className="offcanvas-header">
                        <button
                            aria-label="Close"
                            className="btn-close text-reset ms-auto"
                            data-bs-dismiss="offcanvas"
                            type="button"
                        />
                    </div>
                    <div className="offcanvas-body">
                        {catalog}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xl-3 d-none d-xl-block">
                    {catalog}
                </div>
                <div className="col-12 col-xl-9">
                    {productsList}
                </div>
            </div>
        </>
    );
};

export default ProductsBlock;
