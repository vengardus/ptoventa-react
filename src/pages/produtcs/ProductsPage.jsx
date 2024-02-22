import { Error } from "../../components/moleculas/Error";
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader";
import { ProductsTemplate } from "../../components/templates/products/ProductsTemplate";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";
import { useProductQuery } from "../../hooks/useProductQuery";

export default function ProductsPage() {

  const { isLoading, isError } = useProductQuery()
  const { isLoading: isCategoryLoading } = useCategoryQuery()

  if (isLoading) return <SpinnerLoader />
  if (isCategoryLoading) return <SpinnerLoader />
  if (isError) return <Error />

  return (
    <ProductsTemplate />
  )
}
