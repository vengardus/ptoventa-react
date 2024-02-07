import styled from "styled-components"
import { APP_CONFIG } from "../../utils/dataEstatica"


export const BtnFilter = ({
    func,
    textColor,
    bgColor,
    icon
}) => {

    return (
        <Container
            $bgColor={bgColor}
            $textColor={textColor}
            onClick={() => func(APP_CONFIG.actionCrud.insert)}
        >
            <div className="contentIcon">
                <span>{icon}</span>
            </div>
        </Container>
    )
}


const Container = styled.button`
    min-height: 50px;
    min-width: 50px;
    border-radius: 50%;
    background: ${(props) => props.$bgColor};
    box-shadow: 20px 20px 60px #bebebe -20px -20px 60px #ffffff;
    color: ${(props) => props.$textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: relative;
    cursor: pointer;
    .contentIcon {
        transition: 2s;
        &:hover {
            transform: scale(1.7);
        }
    }
`



