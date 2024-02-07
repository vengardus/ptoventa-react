import { Error } from "../../components/moleculas/Error";
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader";
import { CategoriesTemplate } from "../../components/templates/categories/CategoriesTemplate";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";

export default function CategoriesPage() {

  const {isLoading, isError} = useCategoryQuery()

  if ( isLoading ) return <SpinnerLoader/>
  if ( isError) return <Error />

  return (
    <CategoriesTemplate />
  )
}
