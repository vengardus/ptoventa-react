import { v } from "../../../styles/variables"
import { ActionTable } from "./ActionTable"

export const ContentActionsTable = ({
    funcEdit,
    funcDelete
}) => {
  return (
    <div className="flex gap-3 pl-4">
        <ActionTable 
            func={funcEdit}
            color={'#ee44ee'}
            fontSize={'18px'}
            icon={v.iconeditarTabla}
        />
        <ActionTable 
            func={funcDelete}
            color={'#cc5544'}
            fontSize={'18px'}
            icon={v.iconeliminarTabla}
        />
    </div>
  )
}
