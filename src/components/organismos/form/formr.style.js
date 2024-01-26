import styled from "styled-components";
import { Device } from "../../../styles/breakpoints";

export const FormContainer = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 85%;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 27px;
        cursor: pointer;
      }
    }
    .sectionSearcher {
      position: relative;
    }
    .formulario {
        display: grid;
        grid-template-columns: 1 1fr;
        @media ${Device.tablet} {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            .btnguardarContent {
                display: flex;
                justify-content: end;
                grid-column: 1;
                @media ${Device.tablet} {
                    grid-column: 2;
                }
            }
        }
        section {
            gap: 20px;
            display: flex;
            flex-direction: column;
            .colorContainer {
            .colorPickerContent {
                padding-top: 15px;
                min-height: 50px;
            }
            }
        }
    }
  }
`;

