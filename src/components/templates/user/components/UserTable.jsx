import { useUserStore } from "../../../../stores/user.store"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/tables/ContentActionsTable"
import { TableGeneric } from "../../../organismos/tables/TableGeneric"


export const UserTable = ({
    data,
    actionRegister,
}) => {
    const deleteUser = useUserStore((state) => state.delete)

    const editItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
            return
        }
        actionRegister({action:APP_CONFIG.actionCrud.update, data:item})
    }
    
    const deleteItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede eliminar usuario admin.' })
            return
        }
        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteUser({ id: item.id }))
                        modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
                    else
                        modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
                }
            });
    }
    
    const tableColumns = [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "type_user",
            header: "T.User",
            cell: (info) => <span>{info.getValue()}</span>
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
    

    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}
