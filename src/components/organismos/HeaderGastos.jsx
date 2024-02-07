import styled from "styled-components"
// import { v } from "../../styles/variables"
import { APP_CONFIG } from "../../utils/dataEstatica"
import { Link } from "react-router-dom"
import { Device } from "../../styles/breakpoints"
// import { useUserStore } from "../../store/user.store"


export const HeaderGastos = () => {
    // const dataUser = useUserStore((state) => state.dataUser)
    // const theme = dataUser?.theme ?? APP_CONFIG.theme.light
    // const logo = (theme == APP_CONFIG.theme.light) ? v.logoClientLight : v.logoClientDark

    return (
        <Container>
            <Link to={'/home'}>
                <h1><span>{APP_CONFIG.companyName.slice(0, 2)}</span>{APP_CONFIG.companyName.slice(2)}</h1>
            </Link>
            {/* <div className="ContentImg">
                <img src={logo} alt="logo" />
            </div> */}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    /* border-bottom: 1px solid gray; */
    align-items: center;
    justify-content: start;
    padding-left: 4rem;
    @media ${Device.tablet} {
        padding-left: 2rem;
    }
    h1 {
        display: flex;
        span {
            color: ${({ theme }) => theme.bgCard01}
        }
    }
    a {
        text-decoration: none;
        color: ${({theme}) => theme.text};
    }
    .ContentImg {
        img {
            height: 100%;
            object-fit: contain;
        }
    }

`