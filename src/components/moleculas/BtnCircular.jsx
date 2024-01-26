import styled from "styled-components"

export const BtnCircular = ({
    icon,
    width,
    height,
    bgColor,
    textColor,
    fontSize, 
    translateX,
    translateY
}) => {
    return (
        <Container
            $bgColor={bgColor}
            $textColor={textColor}
            width={width}
            height={height}
            fontSize={fontSize}
            $translateX={translateX}
            $translateY={translateY}
        >
            <span>{icon}</span>
        </Container>
    )
}

const Container = styled.div`
    background-color: ${(props) => props.$bgColor};
    min-width: ${(props) => props.width};
    min-height: ${(props) => props.height};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translatex(${(props)=>props.$translateX})
    translateY(${(props)=>props.$translateY});
    span {
        font-size: ${(props) => props.fontSize};
        text-align: center;
        color: ${(props) => props.$textColor};
    }
    `
