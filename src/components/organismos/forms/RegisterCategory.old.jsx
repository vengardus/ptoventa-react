import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCategoryStore } from "../../../stores/category.store";
import { useCompanyStore } from "../../../stores/company.store";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { v } from "../../../styles/variables";
import { convertirCapitalize } from "../../../utils/conversiones";
import { modalAlert } from "../../../utils/modalAlert";
import { CirclePicker} from "react-color"
import { useState } from "react";

export function RegisterCategory({
    onClose,
    dataSelect,
    action
}) {
    const [color, setColor] = useState('#F44336')
    const insertCategory = useCategoryStore((state) => state.insert)
    const updateCategory = useCategoryStore((state) => state.update)
    const dataCompany = useCompanyStore((state) => state.data)
    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus
    } = useForm();

    const handleOnChangeColor = (color) => {
        setColor(color.hex)
    }

    const registerCategory = async(data) => {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                id: dataSelect.id,
                description: convertirCapitalize(data.description),
                color: color
            };
            const error = await updateCategory(p)
            if (error)
                modalAlert({
                    type: 'warning',
                    text: `No se actualizó la categoría (${error})`
                })
            onClose();
        } else {
            const p = {
                p_description: convertirCapitalize(data.description),
                p_id_company: dataCompany.id,
                p_color: color
            };
            await insertCategory(p)
            onClose();
        }
    }

    useEffect(() => {
        if (action === APP_CONFIG.actionCrud.update) {
            console.log(dataSelect)
            setColor(dataSelect.color)
        }
        setFocus('description')
    }, [setFocus, action, dataSelect]);

    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {action == APP_CONFIG.actionCrud.update ? "Editar categoría" : "Registrar nueva categoría"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(registerCategory)}>
                    <section>
                        <article>
                            <InputText icono={<v.iconocategorias />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.description}
                                    type="text"
                                    placeholder=""
                                    {...register("description", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">categoría</label>
                                {errors.description?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                          <CirclePicker 
                            onChange={handleOnChangeColor}
                            color={color}
                          />
                        </article>

                        <div className="btnguardarContent">
                            <BtnSave
                                icon={<v.iconoguardar />}
                                title="Guardar"
                                bgcolor="#ef552b"
                            />
                        </div>
                    </section>
                </form>
            </div>
        </Container>
    );
}
const Container = styled.div`
  /* transition: 0.5s; */
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
    width: 500px;
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
  }
`;

