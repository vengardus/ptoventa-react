import { useState } from "react";
import { APP_CONFIG } from "../../../../utils/dataEstatica";

export const useActionRegister = () => {
    const [dataSelect, setDataSelect] = useState([]);
    const [action, setAction] = useState(APP_CONFIG.actionCrud.insert);
    const [openRegister, setOpenRegister] = useState(false);
    const [movementType, setMovementType] = useState();
    const [isExploding, setIsExploding] = useState(false);    

    const actionRegister = ({
        movementType = 'xxx',
        action = APP_CONFIG.actionCrud.insert,
        data = [],
    }
    ) => {
        setAction(action);
        setDataSelect(data);
        setOpenRegister(!openRegister);
        setMovementType(movementType)
        setIsExploding(false)
    };

    return {
        action,
        dataSelect,
        openRegister,
        movementType,
        isExploding,
        actionRegister,
        setOpenRegister,
        setMovementType,
        setIsExploding
    };
};
