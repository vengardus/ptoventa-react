
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { v } from "../../../styles/variables";
import { useUserStore } from "../../../store/user.store";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";

export function RegisterAdmin({ setState }) {
    const userInsertAdmin = useUserStore((state) => state.insertAdmin);
    const [errorMesage, setMesageError] = useState(null)

    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const mutationInsertUser = useMutation({
        mutationKey: ['userAdminRegister'],
        mutationFn: async (data) => {
            const p = {
                email: data.email,
                password: data.password,
            };
            setMesageError(null)
            const [, errorMesage] = await userInsertAdmin(p);
            if (!errorMesage) {
                navigate("/");
            } else {
                //setState();
                setMesageError(errorMesage)
                console.log(errorMesage)
            }
        },
    });
    
    return (
        <Container className="bg-gray-900">
            <ContentClose >
                <span className="text-white" onClick={setState}>x</span>
            </ContentClose>
            <section className="subcontainer">


                <div className="headers">
                    <section>
                        <h1>Registrar usuario</h1>
                    </section>

                    {
                        errorMesage
                        && <TextoStateInicio>Datos incorrectos: {errorMesage}</TextoStateInicio>
                    }

                </div>

                <form className="formulario" onSubmit={handleSubmit(mutationInsertUser.mutateAsync)}>
                    <section>
                        <article>
                            <InputText icono={<MdAlternateEmail />}>
                                <input className="form__field"
                                    style={{ textTransform: "lowercase" }}
                                    type="text"
                                    placeholder="email"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                    })}
                                />
                                <label className="form__label">email</label>
                                {errors.email?.type === "pattern" && (
                                    <p>El formato del email es incorrecto</p>
                                )}
                                {errors.email?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                        <article>
                            <InputText icono={<RiLockPasswordLine />}>
                                <input className="form__field"
                                    type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">pass</label>
                                {errors.pass?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                        <div className="btnguardarContent">
                            <BtnSave
                                icon={<v.iconoguardar />}
                                title="Guardar"
                                bgcolor="#ff7556"
                            />
                        </div>
                    </section>
                </form>
            </section>
        </Container>
    );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  /* background: #fff; */
  /*background: ${(props) => props.theme.bgColor};*/
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display:flex;

  align-items:center;
.subcontainer{
  width: 100%;
}

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
      font-size: 20px;
      cursor: pointer;
    }
   
  }
  .formulario {
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
`;

const ContentClose = styled.div`
  position:absolute;
  top:0;
  right:0;
  font-size:33px;
  margin:30px;
  cursor: pointer;
  
  
`

const TextoStateInicio = styled.p`
  color: #fc7575;
`;

