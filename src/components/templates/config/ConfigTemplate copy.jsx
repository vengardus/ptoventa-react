import { useState } from "react"
import styled from "styled-components"
import { v } from "../../../styles/variables"
import { useUserStore } from "../../../store/user.store"
import { APP_CONFIG, TemasData } from "../../../utils/dataEstatica"
import { Header } from "../../organismos/Header"
import { Selector } from "../../organismos/Selector"
import { ListCountry } from "../../organismos/ListCountry"
import { ListGeneric } from "../../moleculas/ListGeneric"
import { BtnSave } from "../../moleculas/BtnSave"
import { CardEliminarData } from "../../organismos/CardEliminarData"


export const ConfigTemplate = () => {
    const { data:dataUser, update:userUpdate } = useUserStore()
    const [state, setState] = useState(false)
    const [stateCountries, setStateCountries] = useState(false)
    const [stateThemes, setStateThemes] = useState(false)
    const [select, setSelect] = useState([])
    const [selectTheme, setSelectTheme] = useState([])
    // pais - moneda
    const currency = select.symbol ?? dataUser.currency
    const country = select.countryName ?? dataUser.country
    const selectedCountry = `${currency} ${country}`
    // tema
    // console.log('selectTheme', selectTheme, selectTheme.description)
    const iconThemeDb = (dataUser.theme === "0") ? "💡" : "🌙"
    const themeDb = (dataUser.theme === APP_CONFIG.theme.light) ? "light" : "dark"
    const initTheme = selectTheme.description ?? themeDb
    const initIconTheme = selectTheme.icon ?? iconThemeDb
    const selectedTheme = `${initIconTheme} ${initTheme}`


    const update = async () => {
        const newTheme = (selectTheme.description === "light") ? "0" : "1"
        const p = {
            theme: newTheme,
            currency: currency,
            country: country,
            id: dataUser.id
        }
        await userUpdate(p)
    }

    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="area2">
                <h1>AJUSTES</h1>
                <ContentCard>
                    <span>Moneda</span>
                    <Selector
                        state={stateCountries}
                        color={v.colorselector}
                        text1={selectedCountry}
                        func={() => setStateCountries(!stateCountries)}
                    />
                    {
                        stateCountries
                        && <ListCountry
                            setSelect={(p) => setSelect(p)}
                            setState={() => setStateCountries(!stateCountries)}
                        />
                    }
                </ContentCard>

                <ContentCard>
                    <span>Tema</span>
                    <Selector
                        text1={selectedTheme}
                        state={stateThemes}
                        color={v.colorselector}
                        func={() => setStateThemes(!stateThemes)}
                    />
                    {
                        stateThemes
                        && <ListGeneric
                            data={TemasData}
                            setState={() => setStateThemes(!stateThemes)}
                            func={setSelectTheme}
                            bottom={"88%"}
                            scroll={"0%"}
                        />
                    }
                </ContentCard>

                <BtnSave
                    title={"Guardar"}
                    bgcolor={v.colorselector}
                    icon={<v.iconoguardar />}
                    func={update}
                />

                <CardEliminarData />
            </section>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template:
        "header" 100px
        //"area1" 100px
        "area2" auto;
        //"main" auto;

    h1 {
        font-size: 3rem;
    }
    .header {
        grid-area: header;
        /* background-color: rgba(103, 93, 241, 0.14); */
        display: flex;
        align-items: center;
    }
    /* .area1 {
        grid-area: area1;
        background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    .area2 {
        grid-area: area2;
        /* background-color: rgba(77, 237, 106, 0.14); */
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: start;
        gap: 30px;
        /* align-self: center; */
    }
    /* .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    } */
`

const ContentCard = styled.div`
    display: flex;
    text-align: start;
    align-items: center;
    gap: 20px;
    position: relative;
    width: 100%;
    justify-content: center;
`;