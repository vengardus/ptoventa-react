import styled from "styled-components"
import Swal from "sweetalert2"

import { v } from "../../styles/variables"
import { BtnSave } from "../moleculas/BtnSave"
import { useUserStore } from "../../stores/user.store"


export const CardEliminarData = () => {
    const { data:dataUser } = useUserStore()

    const deleteAllCategory = async () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, ¡no podrá recuperar los registros!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const p = {
                    id_user: dataUser.id
                }
                // await categoryDeleteAll(p)
                console.log(p);
            }
        });
    }

    return (
        <Container>
            <h2>Resetear todo</h2>
            <span>
                ADVERTENCIA!: Esta acción es irreversible, se eliminará toda la data<br />
                Se eliminarán los saldos acumulados
            </span>
            <BtnSave
                title={"Resetear"}
                bgcolor={"orange"}
                func={deleteAllCategory}
            />
            <div className="contentImg">
                <img src={v.logo} alt="" />
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    border-radius: 10px;
    border: 2px solid lightsalmon;
    height : 100%;
    background: linear-gradient(18deg, black 9%, salmon  100%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 20px;
    h2 {
        color: red;
    }
    span {
        color: red;
        font-size: 14px;
    }
    .contentImg {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20%;
        opacity: 0.18;
        margin: 30px;
        img {
            width: 70%;
            animation: flotar 1.7s ease-in-out infinite alternate;
        }
    }
    @keyframes flotar {
        0% {
            transform: translate(0, 0px);
        }
        50% {
            transform: translate(0, 10px);
        }
        100% {
            transform: translate(0, 0px);
        }
    }
`