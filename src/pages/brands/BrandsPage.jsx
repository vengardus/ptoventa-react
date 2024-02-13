import { Error } from "../../components/moleculas/Error";
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader";
import { BrandsTemplate } from "../../components/templates/brands/BrandsTemplate";
import { useBrandQuery } from "../../hooks/useBrandQuery";

export default function BrandsPage() {

  const {isLoading, isError} = useBrandQuery()

  if ( isLoading ) return <SpinnerLoader/>
  if ( isError) return <Error />

  return (
    <BrandsTemplate />
  )
}
