import { flexRender } from "@tanstack/react-table"
import {
  // Column,
  // Table,
  useReactTable,
  // ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  // getFacetedRowModel,
  // getFacetedUniqueValues,
  // getFacetedMinMaxValues,
  getPaginationRowModel,
  // sortingFns,
  getSortedRowModel,
  // FilterFn,
  // SortingFn,
  // ColumnDef,
  // flexRender,
  // FilterFns,
} from "@tanstack/react-table"
import { ContentActionsTable } from "./ContentActionsTable"
import { modalAlert } from "../../../utils/modalAlert"
import { useProductStore } from "../../../store/ProductStore"
import { APP_CONFIG } from "../../../utils/dataEstatica"
import { FaArrowsAltV } from "react-icons/fa"
import { Pagination } from "./Pagination"
//import { useState } from "react"
export const TableProduct = ({

  data,
  actionRegister,
  isStriped = true
}) => {
  //const [page, setPage] = useState(1)
  const deleteProduct = useProductStore((state) => state.delete)

  const editIten = (item) => {
    if (item.description.trim() == APP_CONFIG.defaultValues.genericDescription) {
      modalAlert({ type: 'warning', text: 'No se puede editar marca genérica.' })
      return
    }
    actionRegister(APP_CONFIG.actionCrud.update, item)
  }

  const deleteItem = (item) => {
    if (item.description.trim() == APP_CONFIG.defaultValues.genericDescription) {
      modalAlert({ type: 'warning', text: 'No se puede eliminar marca genérica.' })
      return
    }

    modalAlert({ type: 'delete' })
      .then(async (result) => {
        if (result.isConfirmed) {
          if (await deleteProduct({ id: item.id }))
            modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
          else
            modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
        }
      });
  }

  const columns = [
    {
      accessorKey: "description",
      header: "Descripción",
      cell: (info) => <span>{info.getValue()}</span>
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: (info) => <span>{info.getValue()}</span>
    },
    {
      accessorKey: "price_sale",
      header: "P.Venta",
      cell: (info) => <span>{info.getValue()}</span>
    },
    {
      accessorKey: "price_buy",
      header: "P.Compra",
      cell: (info) => <span>{info.getValue()}</span>
    },
    {
      accessorKey: "description_category",
      header: "Categoría",
      cell: (info) => <span style={{color:`${info.row.original.category_color}`}}>{info.getValue()}</span>
    },
    {
      accessorKey: "category_color",
      header: "Categoría",
      cell: (info) => <span>{info.getValue()}</span>
    },

    {
      accessorKey: "actions",
      header: "Acciones",
      enableSorting: false,
      cell: (info) => <ContentActionsTable
        funcEdit={() => editIten(info.row.original)}
        funcDelete={() => deleteItem(info.row.original)}
      />
    },

  ]
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })


  return (
    <>
      <div className="tableContainer">
        <table className="">
          <thead>
            {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id} className="">
                        <span className="flex">
                          {header.column.columnDef.header}
                          {header.column.getCanSort() && (
                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <FaArrowsAltV />
                            </span>
                          )}
                          {
                            {
                              asc: '🔼',
                              desc: '🔽'
                            }[header.column.getIsSorted()]
                          }
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map(item => (
                <tr key={item.id} className={`${(isStriped) ? 'tableStriped' : ''}`} >
                  {
                    item.getVisibleCells().map(cell => (
                      <th key={cell.id} scope='row'>
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Pagination
        table={table}
        goBegin={() => table.setPageIndex(0)}
        page={table.getState().pagination.pageIndex + 1}
        //setPage={setPage}
        pageCount={table.getPageCount()}
      />
    </>
  )
}
