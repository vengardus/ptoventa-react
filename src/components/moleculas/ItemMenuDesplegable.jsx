import styled from "styled-components"

import { Icon } from "../atomos/Icon"
import { ContentColor } from "../atomos/ContentColor"


export const ItemMenuDesplegable = ({
    item,   // obj
    func    // function
}) => {
    return (
        <Container onClick={func}>
            { item.icono && <Icon>{<item.icono />}</Icon>}
            <ContentColor $alto="12px" $ancho="12px" $color={item.color}/>
            <span>{item.text}</span>
        </Container>
    )
}



const Container = styled.div`
    cursor: pointer;
    padding: 8px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap:10px;
    &:hover {
        background-color: ${(props)=>props.theme.bg4}
    }
    svg {
        font-size: 28px;
        display: block;
    }
`
