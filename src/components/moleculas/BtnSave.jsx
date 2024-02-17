import styled from "styled-components"
import { Icon } from "../atomos/Icon"


export const BtnSave = ({
    func,
    title,
    bgcolor,
    icon,
    width = 'auto',
    textColor = '#000'
}) => {

    return (
        <Container type="submit" $bgcolor={bgcolor} $width={width} $textColor={textColor}>
            <span className="btn" onClick={func}>
                {icon && <Icon >{icon}</Icon> }
                {/* {icon && <Icon $textColor={bgcolor}>{icon}</Icon> } */}
                {title}
            </span>
        </Container>
    )
}


const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border: none;
    gap: 10px;
    background-color:initial;
    cursor: pointer;
    z-index: 2;
    /* width: auto; */
    width: ${(props) => props.$width};
    .btn {
        width: ${(props) => props.$width};
        background: ${(props) => props.$bgcolor};
        padding: 0.6em 1.3em;
        font-weight: 900;
        font-size: 18px;
        border: 3px solid black;
        border-radius: 0.5em;
        box-shadow: 0.1em 0.1em #000;
        transition: 0.2s;
        white-space: 1px;
        color: ${(props) => props.$textColor};
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.7em;
        &:hover {
            transform: translate(-0.05em, -0.05em);
            box-shadow: 0.15em 0.15em #000;
        }
        &:active {
            transform: translate(0.05em, 0.05em);
            box-shadow: 0.1em 0.1em #000;
        }
    }
`



