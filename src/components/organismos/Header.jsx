import styled from "styled-components";
import { useAuthWithEmailStore } from "../../store/AuthWithEmailStore";
import { UserAuth } from "../../context/AuthContext";
import { BtnCircular } from "../moleculas/BtnCircular";
import { v } from "../../styles/variables";
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable";
import { DesplegableUser } from "../../utils/dataEstatica";


export function Header({ stateConfig }) {
  const signOut = useAuthWithEmailStore((state) => state.signOut)
  const { user } = UserAuth();

  const funcionXtipo = async (p) => {
    if (p.tipo === "cerrarsesion") {
      await signOut();
    }
  };

  return (
    <Container>

      <Datauser onClick={stateConfig.setState}>
        <div className="imgContainer">
          <img src="https://i.ibb.co/kGYgRZ8/programador.png" />
        </div>
        <BtnCircular
          icon={<v.iconocorona />}
          width="25px"
          height="25px"
          bgColor={`linear-gradient(15deg, rgba(255, 88, 58, 0.86) 9%, #f8bf5b 100%);`}
          textColor="#ffffff"
          fontSize="11px"
          translateX="-50px"
          translateY="-12px"
        />
        <span className="nombre">{user.email}</span>
        {stateConfig.state && (
          <ListMenuDesplegable
            data={DesplegableUser}
            top="62px"
            func={(p) => funcionXtipo(p)}
          />
        )}
      </Datauser>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;
const Datauser = styled.div`
  z-index: 10;
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
  .imgContainer {
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
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;