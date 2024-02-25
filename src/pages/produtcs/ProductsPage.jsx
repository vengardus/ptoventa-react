import { Error } from "../../components/moleculas/Error";
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader";
import { ProductsTemplate } from "../../components/templates/products/ProductsTemplate";
import { useBranchQuery } from "../../hooks/useBranchQuery";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";
import { useProductQuery } from "../../hooks/useProductQuery";


export default function ProductsPage() {
    const { isLoading, isError, error } = useProductQuery()
    const { isLoading: isCategoryLoading, isError: isCategoryError, error: categoryError } = useCategoryQuery()
    const { isLoading: isBranchLoading, isError: isBranchError, error: branchError } = useBranchQuery()

    if (isLoading) return <SpinnerLoader />
    if (isError) return <Error message={error.message} />

    if (isCategoryLoading) return <SpinnerLoader />
    if (isCategoryError) return <Error message={categoryError.message} />

    if (isBranchLoading) return <SpinnerLoader />
    if (isBranchError) return <Error message={branchError.message} />

    return (
        <ProductsTemplate />
    )
}
