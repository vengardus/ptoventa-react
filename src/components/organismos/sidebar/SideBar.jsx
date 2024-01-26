import styled from "styled-components"
import { NavLink } from "react-router-dom"

import { v } from "../../../styles/variables"
import { APP_CONFIG, LinksArray, SecondarylinksArray } from "../../../utils/dataEstatica"
import { SideBarCard } from "./SideBarCard"
import { UserAuth } from "../../../context/AuthContext"
import { ToggleTema } from "../ToggleTema"


export const SideBar = ({ state, setState }) => {
    const { user } = UserAuth()


    return (
        <Main $isOpen={state}>
            <span className="SiderBarButton" onClick={() => setState(!state)}>
                {<v.iconoflechaderecha />}
            </span>
            <Container $isOpen={state} className={state ? "active" : ""}>
                <div className="ContentLogo">
                    <div className="ContentImg">
                        <img src={v.logo} />
                    </div>
                    <h2>{APP_CONFIG.companyName}</h2>
                </div>

                <div className="Welcome">
                    <span>Bienvenido!</span>
                    <div className="InfoUser">
                        {
                            user
                            && 
                            <div className="ContainerImg">
                                <img src={user?.picture} />
                            </div>
                        }
                        {
                            user && <span>{String(user?.email)?.slice(0, 12)}</span>
                        }

                    </div>
                </div>

                {
                    LinksArray.map(({ icon, label, to }) => {
                        const Icon = icon
                        return <div key={label} className={state ? "ContentLink active" : "ContentLink"}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => `Links${isActive ? ' active' : ''}`}
                            >
                                <div className="LinkIcon">{<Icon />}</div>
                                {state && <span>{label}</span>}
                            </NavLink>
                        </div>
                    })
                }
                <Divider />
                {
                    SecondarylinksArray.map(({ icon, label, to }) => {
                        const Icon = icon
                        return <div key={label} className={state ? "ContentLink active" : "ContentLink"}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => `Links${isActive ? ' active' : ''}`}
                            >
                                <div className="LinkIcon">{<Icon />}</div>
                                {state && <span>{label}</span>}
                            </NavLink>
                        </div>
                    })
                }
                <ToggleTema />
                <Divider />
                {
                    state && <SideBarCard />
                }

            </Container>
        </Main>
    )
}


const Main = styled.div`
    .SiderBarButton {
        position: fixed;
        top: 70px;
        left: 42px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${(props) => props.theme.bgtgderecha};
        box-shadow: 0 0 4px ${(props) => props.theme.bg3}, 0 0 7px ${(props) => props.theme.bg};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 2;
        transform: ${({ $isOpen }) => $isOpen ? `translateX(162px) rotate(3.142rad)` : `initial`};
        color: ${(props) => props.theme.text};
    }
`
const Container = styled.div`
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.bg};
    position: fixed;
    padding-top: 20px;
    z-index: 1;
    height: 100%;
    width: 65px;
    transition: 0.3s ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colorScroll};
    }
    &.active {
        width: 220px;
    }
    .ContentLogo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 60px;
        .ContentImg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            cursor: pointer;
            transition: all 0.5s ease-in-out;
            transform: ${({ $isOpen }) => ($isOpen ? `scale(0.7)` : `scale(1.5)`)} rotate(${(props) => props.theme.logorotate});
            img {
                width: 100%;
                animation: flotar 1.7s ease-in-out infinite alternate 
            }
        }
        h2 {
            display: ${({ $isOpen }) => ($isOpen ? `block` : `none`)} 
        }
        @keyframes flotar {
            0% {
                transform: translate(0, 0px);
            }
            50% {
                transform: translate(0, 4px);
            }
            100% {
                transform: translate(0, -0px);
            }
        }
    }
    .Welcome {
        display: ${({ $isOpen }) => ($isOpen ? `block` : `none`)};
        padding: 0 5%;
        margin-bottom:10px;
        .InfoUser  {
            display: flex;
            align-items: center;
            padding-top: 3px;
            .ContainerImg {
                height: 40px;
                width: 40px;
                min-height: 40px;
                min-width: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 22px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    .ContentLink {
        margin: 5px 0;
        transition: all 0.3s;
        padding: 0 5%;
        position: relative;
        &:hover {
            background: ${(props) => props.theme.bgAlpha};
        }
        .Links {
            display:flex;
            align-items: center;
            text-decoration: none;
            padding: calc(${() => v.smSpacing}-2px) 0;
            color: ${(props) => props.theme.text};
            height:60px;
            .LinkIcon {
                padding: ${() => v.smSpacing} ${() => v.mdSpacing};
                display: flex;
                svg {
                    font-size:25px;
                }
            }
            &.active {
                color: ${(props) => props.theme.bg5};
                &::before {
                    content: "";
                    position:absolute;
                    height: 100%;
                    background: ${(props) => props.theme.bg5};
                    width: 4px;
                    border-radius:10px;
                    left:0;
                }
            }
        }
    }
`
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.bg4};
    margin: ${v.lgSpacing} 0;
`
