import styled from "styled-components";
//import { HashLoader } from "react-spinners";
import { PacmanLoader } from "react-spinners";

//import { useOperations } from "../../stores/OperationsStore";


export function SpinnerLoader() {
  //const { colorCategory } = useOperations();
  return (
    <Container>
      <PacmanLoader color={"#d69136"} size={25}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${(props)=>props.theme.bg4};
  transform: all 0.3s;


`;