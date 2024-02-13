import { useBrandStore } from "../../../../store/brand.store"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"


export const Table = ({
    data,
    actionRegister,
}) => {
    const deleteRegister = useBrandStore((state) => state.delete)

    const editItem = (item) => {
        actionRegister({ action: APP_CONFIG.actionCrud.update, data: item })
    }

    const deleteItem = (item) => {
        if (item.is_default) {
            modalAlert({ type: 'warning', text: 'No se puede eliminar categoría genérica.' })
            return
        }
        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteRegister(item))
                        modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
                    else
                        modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
                }
            });
    }

    const tableColumns = [
        {
            accessorKey: "description",
            header: "Descripción",
            cell: (info) => <span className="md:text-lg">{info.getValue()}</span>
        },

        {
            accessorKey: "actions",
            header: "Acciones",
            enableSorting: false,
            cell: (info) => <ContentActionsTable
                funcEdit={() => editItem(info.row.original)}
                funcDelete={() => deleteItem(info.row.original)}
            />

        },
    ]

    /* custom columns */
    const customColumns = tableColumns.map(item => ({ accessorKey: item.accessorKey, responsive: '' }))
    //customColumns[2].responsive = 'hidden sm:block'

    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}

