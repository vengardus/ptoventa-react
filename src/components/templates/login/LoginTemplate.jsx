import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useAuthWithEmailStore } from "../../../store/AuthWithEmailStore";
import { InputText } from "../../organismos/form/InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { FooterLogin } from "../../organismos/sidebar/FooterLogin";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breakpoints";

//import { MdOutlineInfo } from "react-icons/md";
import carrito from "../../../assets/carrito.svg";
import logo from "../../../assets/inventarioslogo.png";
import { RegisterAdmin } from "../../organismos/form/RegisterAdmin";
import { Line } from "../../atomos/Line";
import { useAuthWithGoogleStore } from "../../../store/AuthWithGoogleStore";
import { APP_CONFIG } from "../../../utils/dataEstatica";


export function LoginTemplate() {
  const signInWithEmail = useAuthWithEmailStore((state) => state.signInWithEmail);
  const signInWithGoogle = useAuthWithGoogleStore((state) => state.signInWithGoogle);
  const [state, setState] = useState(false);
  const [stateInicio, setStateInicio] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function iniciar(data) {
    console.log('iniciar', data)
    // const response = await signInWithEmail({
    //   email: data.email,
    //   password: data.password,
    // });
    // if (response) {
    //   navigate("/");
    // } else {
    //   setStateInicio(true);
    // }
  }

  return (
    <Container>
      <div className="card">
        <ContentLogo>
          <img src={v.logo} />
          <span>{APP_CONFIG.appName}</span>
        </ContentLogo>
        <Title $paddingbottom="40px">Ingresar</Title>

        <form>
          <InputText icono={<v.iconoemail />}>
            <input
              className="form__field"
              type="text"
              placeholder="email"
              {...register("email", {
                required: true,
              })}
            />
            <label className="form__label">email</label>
            {errors.email?.type === "required" && <p>Campo requerido</p>}
          </InputText>
          <InputText icono={<v.iconopass />}>
            <input
              className="form__field"
              type="password"
              placeholder="contraseña"
              {...register("password", {
                required: true,
              })}
            />
            <label className="form__label">password</label>
            {errors.password?.type === "required" && <p>Campo requerido</p>}
          </InputText>
          <BtnSave
            title="INGRESAR"
            bgcolor="#1CB0F6"
            textColor="255,255,255"
            width="100%"
          />
        </form>
        <Line>
          <span>0</span>
        </Line>
        <BtnSave
          func={signInWithGoogle}
          title="Google"
          bgcolor="#fff"
          icon={<v.iconogoogle />}
          width={'100%'}
        />
      </div>
      <FooterLogin />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 0 1em;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal};
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 20px;
    @media ${Device.tablet} {
      width: 400px;
    }
  }
`;
const ContentLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap: 0.5em;
  span {
    font-weight: 700;
  }
  img {
    width: 10%;
  }
`;
const Title = styled.span`
    font-weight:700;
    font-size:30px;
    padding-bottom:${(props) => props.$paddingbottom};
`