import styled from "styled-components"


export const  Line = styled.div`
    background-color: ${(props) => props.theme.color2};
    height: 2px;
    border-radius: 15px;
    margin: 20px 0;
    text-align: center;
    position: relative;
    span {
        top: -10px;
        position: absolute;
        background-color:  ${(props) => props.theme.bgtotal};
        text-align: center;
        padding: 0 5px;
        color: ${(props) => props.theme.color2};
        font-weight: 700;
    }
`