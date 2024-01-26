import styled from "styled-components"

import iso from "iso-country-currency"
import { InputSearchList } from "../moleculas/InputSearchList"
import { convertirCapitalize } from "../../utils/conversiones"
import { useState } from "react"
import { Device } from "../../styles/breakpoints"
import { BtnClose } from "../atomos/BtnClose"


export const ListCountry = ({ setSelect, setState }) => {
    const isoCodes = iso.getAllISOCodes()
    const [dataResult, setDataResult] = useState([])
    

    const selectItem = (p) => {
        setSelect(p)
        setState()
    }


    const search = (e) => {
        const filterCodes = isoCodes.filter((item) => {
            const len = (e.target.value.length < 3) ? 3 : e.target.value.length
            return item.countryName.slice(0, len) == convertirCapitalize(e.target.value);
        })
        setDataResult(filterCodes)
    }

    return (
        <Container>
            <header className="header">
                <span>busca tu país</span>
                <BtnClose func={setState} />
            </header>
            <InputSearchList
                onChange={search}
                placeholder={"Buscar..."}
            />
            {
                dataResult.length > 0
                && dataResult.map((item, index) => {
                    return (
                        <ItemContainer key={index}
                            onClick={() => selectItem(item)}
                        >
                            <span>{item.countryName}</span>
                            <span>{item.symbol}</span>
                        </ItemContainer>
                    )
                })
            }
        </Container>
    )
}


const Container = styled.div`
    margin-top: 15px;
    position: absolute;
    top: 88%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.body};
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    color: ${({ theme }) => theme.text};
    z-index: 3;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: inherit;
    }
    @media ${()=> Device.tablet} {
        width: 400px;
    }
    
`
const ItemContainer = styled.section`
    gap: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.bgtotal};
    }
`;