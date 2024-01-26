import styled from "styled-components"


export const ContentColor = styled.div`
    justify-content: center;
    min-height: ${(props) => props.$alto};
    width: ${(props) => props.$ancho};
    display: block;
    background-color: ${(props) => props.$color};
    border-radius: 50%;
    text-align: center;
`

