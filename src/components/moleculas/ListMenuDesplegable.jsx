import styled from "styled-components"

import { ItemMenuDesplegable } from "./ItemMenuDesplegable"
import { v } from "../../styles/variables"

export const ListMenuDesplegable = ({
    data,   // obj
    top,    // string
    func    // function
}) => {
    return (
        <Container $top={top}>
            {
                data.map((item, index) => (
                    <ItemMenuDesplegable
                        key={index}
                        item={item}
                        func={() => func(item)}
                    />
                ))
            }
        </Container>
    )
}


const Container = styled.div`
    display:flex;
    flex-direction: column;
    padding: 10px;
    position: absolute;
    background-color: ${(props) => props.theme.bg3};
    border-radius: 22px;
    top: ${(props) => props.$top};
    box-shadow: ${() => v.boxshadowGray};
    z-index:3;
`