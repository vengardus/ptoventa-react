import styled from "styled-components"

import { UserAuth } from "../../context/AuthContext";
import { BtnCircular } from "../moleculas/BtnCircular";
import { v } from "../../styles/variables"
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable";
import { DesplegableUser } from "../../utils/dataEstatica";
import { useAuthWithEmailStore } from "../../store/AuthWithEmailStore";

export const DataUser = ({ stateConfig }) => {
    const { user } = UserAuth();
    const { signOut } = useAuthWithEmailStore()

    const funcionXtipo = async (tipo) => {
        if (tipo.tipo === "cerrarsesion") {
            await signOut();
        }
    };

    if ( !user ) {
        console.log('No se encontró usuario logeado!', DataUser.name)
        return <></>
    }

    return (
        <Container onClick={stateConfig.setState}>
            <div className="ContainerImg">
                <img src={user.picture} />
            </div>

            <BtnCircular
                icon={<v.iconocorona />}
                width="25px"
                height="25px"
                bgColor={"#ffffff"}
                textColor={"#181616"}
                fontSize={"11px"}
                translateX="-50px"
                translateY="-12px"
            />

            <span className="name">{user.name}</span>

            {
                stateConfig.state
                && <ListMenuDesplegable
                    data={DesplegableUser}
                    top={"52px"}
                    func={(tipo) => funcionXtipo(tipo)}
                />
            }

        </Container>
    )
}



const Container = styled.div`
    position: relative;
    top: 0;
    right: 0;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 50px;
    margin: 15px;
    cursor: pointer;

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
    &:hover {
        background-color: ${({ theme }) => theme.bg3};
    }
    .name {
        width: 100%;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: break-word;
    }        
`