import styled from "styled-components"
import { Device } from "../../styles/breakpoints"
import { BtnClose } from "../atomos/BtnClose"


export const ListGeneric = ({
    data,
    setState,
    func,
    bottom = "-380px",
    height = "360px",
    scroll }
) => {

    const selectItem = (p) => {
        func(p)
        setState()
    }

    return (
        <Container $bottom={bottom} $scroll={scroll} $height={height}>
            <section className="ContentClose">
                <BtnClose func={setState} />
            </section>
            <section className="ContentItems">
                {
                    data.map((item, index) => {
                        return (
                            <ItemContainer key={index} onClick={() => selectItem(item)}>
                                <span>💎</span>
                                <span>{item.description}</span>
                            </ItemContainer>
                        )
                    })
                }
            </section>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    position: absolute;
    margin-bottom: 15px;
    bottom: ${(props) => props.$bottom};
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
    z-index:3;
    /* height: 360px; */
    height: ${(props) => props.$height};
    /* max-height: 360px; */
    /* background-color: orange; */
    align-content: start;
    flex-wrap: wrap;
    border-style:dotted;
    border-color:gray;
    border-width:1px;
    @media ${() => Device.tablet} {
        width: 400px;
    }        
    .ContentItems {
        overflow-y: ${(props) => props.$scroll};
        width: 100%;
        /* position: relative;
        overflow: auto;
        scrollbar-color: yellow;
        scrollbar-width: 40px; */
    }
`

const ItemContainer = styled.div`
    gap: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    justify-items: left;
    transition: 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.bgtotal};
    }
`