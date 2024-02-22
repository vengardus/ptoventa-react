import { v } from "../../../styles/variables"
import { ActionTable } from "./ActionTable"

export const ContentActionsTable = ({
    funcEdit,
    funcDelete
}) => {
  return (
    <div className="flex gap-4 pl-0">
        <ActionTable 
            func={funcEdit}
            // color={'#ee44ee'}
            color={'white'}
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
