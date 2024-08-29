import { Error } from "../../components/moleculas/Error"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { PosTemplate } from "../../components/templates/pos/PosTemplate"
import { useProductQuery } from "../../hooks/useProductQuery"
import { useSaleQuery } from "../../hooks/useSaleQuery"

export const PosPage = () => {
  const { isLoading, isError, error } = useProductQuery()
  const { isLoadingSale, isErrorSale, errorSale } = useSaleQuery()

  if (isLoading) return <SpinnerLoader />
  if (isError) return <Error message={error.message} />

  if (isLoadingSale) return <SpinnerLoader />
  if (isErrorSale) return <Error message={errorSale.message} />

  return (
    <PosTemplate />
  )
}
