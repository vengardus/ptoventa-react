import { useCategoryStore } from "../../../../store/category.store"
import { v } from "../../../../styles/variables"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentColor } from "../../../atomos/ContentColor"
import { Icon } from "../../../atomos/Icon"
import { ImageContent } from "../../../moleculas/ImageContent"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"


export const Table = ({
    data,
    actionRegister,
}) => {
    const deleteRegister = useCategoryStore((state) => state.delete)

    const editItem = (item) => {
        // if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
        //     modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
        //     return
        // }
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
            accessorKey: "icon",
            header: "Icono",
            enableSorting: false,
            cell: (info) => (
                <span>
                    {
                        info.getValue() != null
                            ? (<ImageContent imagen={info.getValue()} />)
                            : (<span className="w-[50px] h-[50px] flex justify-center py-3">
                                <Icon>{<v.iconoimagenvacia />}</Icon>
                            </span>)
                    }
                </span>
            ),

            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },

        {
            accessorKey: "description",
            header: "Descripción",
            cell: (info) => <span className="md:text-lg">{info.getValue()}</span>
        },

        {
            accessorKey: "color",
            header: "Color",
            enableSorting: false,
            cell: (info) => (
                <span className="flex py-3" >
                    <ContentColor $color={info.getValue()} $alto="25px" $ancho="25px" />
                </span>
            ),

            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
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
    customColumns[2].responsive = 'hidden sm:block'

    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}

