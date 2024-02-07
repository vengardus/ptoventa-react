import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useProductStore } from "../../../store/ProductStore";
import { useCompanyStore } from "../../../store/company.store";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { v } from "../../../styles/variables";
import { convertirCapitalize } from "../../../utils/conversiones";
import { modalAlert } from "../../../utils/modalAlert";
import { ContentSelector } from "../../atomos/ContentSelector";
import { Selector } from "../Selector";
import { useBrandStore } from "../../../store/BrandStore";
import { useState } from "react";
import { BtnFilter } from "../../moleculas/BtnFilter";
import { RegisterBrand } from "./RegisterBrand";
import { ListGeneric } from "../ListGeneric";
import { useCategoryStore } from "../../../store/CategoryStore";
import { RegisterCategory } from "./RegisterCategory";
import { Device } from "../../../styles/breakpoints";


export function RegisterProduct({
    onClose,
    dataSelect,
    action
}) {
    const [stateBrand, setStateBrand] = useState(false)
    const [openRegisterBrand, setOpenRegisterBrand] = useState(false)
    const [subAction, setSubAction] = useState('')
    const [stateCategory, setStateCategory] = useState(false)
    const [openRegisterCategory, setOpenRegisterCategory] = useState(false)

    const insertProduct = useProductStore((state) => state.insert)
    const updateProduct = useProductStore((state) => state.update)
    const dataCompany = useCompanyStore((state) => state.data)
    const brandSelect = useBrandStore((state) => state.itemSelect)
    const dataBrand = useBrandStore((state) => state.data)
    const selectBrand = useBrandStore((state) => state.selectBrand)

    const categorySelect = useCategoryStore((state) => state.itemSelect)
    const dataCategory = useCategoryStore((state) => state.data)
    const selectCategory = useCategoryStore((state) => state.selectCategory)
    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus
    } = useForm();

    const addBrand = () => {
        setOpenRegisterBrand(!openRegisterBrand)
        setSubAction(APP_CONFIG.actionCrud.insert)
    }

    const addCategory = () => {
        setOpenRegisterCategory(!openRegisterCategory)
        setSubAction(APP_CONFIG.actionCrud.insert)
    }

    const registerProduct = async (data) => {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                id: dataSelect.id,
                description: convertirCapitalize(data.description),
                id_brand: brandSelect.id,
                stock: parseFloat(data.stock),
                stock_min: parseFloat(data.stock_min),
                codebar: data.codebar,
                cod: data.cod,
                price_sale: parseFloat(data.price_sale),
                price_buy: parseFloat(data.price_buy),
                id_category: categorySelect.id,
            };
            const error = await updateProduct(p)
            if (error)
                modalAlert({
                    type: 'warning',
                    text: `No se actualizó el producto (${error})`
                })
            onClose();
        } else {
            const p = {
                p_description: convertirCapitalize(data.description),
                p_id_company: dataCompany.id,
                p_id_brand: brandSelect.id,
                p_stock: parseFloat(data.stock),
                p_stock_min: parseFloat(data.stock_min),
                p_codebar: data.codebar,
                p_cod: data.cod,
                p_price_sale: parseFloat(data.price_sale),
                p_price_buy: parseFloat(data.price_buy),
                p_id_category: categorySelect.id,
            };
            await insertProduct(p)
            onClose();
        }
    }

    useEffect(() => {
        // if (action === APP_CONFIG.actionCrud.update) {
        // }
        setFocus('description')

        if (action === APP_CONFIG.actionCrud.update) {
            selectBrand({
                id: dataSelect.id_brand,
                description: dataSelect.description_brand
            })
            selectCategory({
                id: dataSelect.id_categoria,
                description: dataSelect.description_category
            })
        }
        //console.log('brandselect', brandSelect)
    }, [setFocus, action, selectBrand, selectCategory,
        dataSelect.id_brand, dataSelect.description_brand,
        dataSelect.id_categoria, dataSelect.description_category
    ]);

    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {action == APP_CONFIG.actionCrud.update ? "Editar producto" : "Registrar nuevo producto"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(registerProduct)}>
                    <section>
                        {/* description */}
                        <article>
                            <InputText icono={<v.icononombre />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.description}
                                    type="text"
                                    placeholder=""
                                    {...register("description", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Descripción</label>
                                {errors.description?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* brand */}
                        <ContentSelector>
                            <label>Marca:</label>
                            <Selector
                                text1={'🍿'}
                                text2={brandSelect?.description}
                                color={'#fc6027'}
                                state={stateBrand}
                                func={() => setStateBrand(!stateBrand)}
                            />
                            {
                                stateBrand
                                && <ListGeneric
                                    data={dataBrand}
                                    scroll={"scroll"}
                                    setState={() => setStateBrand(!stateBrand)}
                                    bottom={"-240px"}
                                    func={selectBrand}
                                />
                            }
                            <BtnFilter
                                bgColor={'#f6f3f3'}
                                textColor={'#353535'}
                                icon={<v.agregar />}
                                func={() => addBrand()}
                            />
                        </ContentSelector>

                        {/* stock */}
                        <article>
                            <InputText icono={<v.iconostock />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.stock}
                                    type="number"
                                    step={"0.01"}
                                    placeholder=""
                                    {...register("stock", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Stock</label>
                                {errors.stock?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* stock_min */}
                        <article>
                            <InputText icono={<v.iconostock />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.stock_min}
                                    type="number"
                                    step={"0.01"}
                                    placeholder=""
                                    {...register("stock_min", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Stock Mínimo</label>
                                {errors.stock_min?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* category */}
                        <ContentSelector>
                            <label>Categoría:</label>
                            <Selector
                                text1={'🍿'}
                                text2={categorySelect?.description}
                                color={'#fc6027'}
                                state={stateCategory}
                                func={() => setStateCategory(!stateCategory)}
                            />
                            {
                                stateCategory
                                && <ListGeneric
                                    data={dataCategory}
                                    scroll={"scroll"}
                                    setState={() => setStateCategory(!stateCategory)}
                                    bottom={"-0px"}
                                    func={selectCategory}
                                />
                            }
                            <BtnFilter
                                bgColor={'#f6f3f3'}
                                textColor={'#353535'}
                                icon={<v.agregar />}
                                func={() => addCategory()}
                            />
                        </ContentSelector>
                    </section>

                    <section>
                        {/* codebar */}
                        <article>
                            <InputText icono={<v.iconocodigobarras />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.codebar}
                                    type="text"
                                    placeholder=""
                                    {...register("codebar", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Código de barras</label>
                                {errors.codebar?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* cod */}
                        <article>
                            <InputText icono={<v.iconocodigointerno />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.cod}
                                    type="text"
                                    placeholder=""
                                    {...register("cod", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Código interno</label>
                                {errors.cod?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* price_sale */}
                        <article>
                            <InputText icono={<v.iconoprecioventa />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.price_sale}
                                    type="number"
                                    step={"0.01"}
                                    placeholder=""
                                    {...register("price_sale", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Precio Venta</label>
                                {errors.price_sale?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* price_buy */}
                        <article>
                            <InputText icono={<v.iconoprecioventa />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.price_buy}
                                    type="number"
                                    step={"0.01"}
                                    placeholder=""
                                    {...register("price_buy", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Precio Compra</label>
                                {errors.price_buy?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                    </section>

                    <div className="btnguardarContent">
                        <BtnSave
                            icon={<v.iconoguardar />}
                            title="Guardar"
                            bgcolor="#ef552b"
                        />
                    </div>
                </form>

                {/* registerBrand */}
                {
                    openRegisterBrand
                    && <RegisterBrand
                        dataSelect={[]}
                        onClose={() => setOpenRegisterBrand(!openRegisterBrand)}
                        action={subAction}
                    />

                }

                {/* registerCategory */}
                {
                    openRegisterCategory
                    && <RegisterCategory
                        dataSelect={[]}
                        onClose={() => setOpenRegisterCategory(!openRegisterCategory)}
                        action={subAction}
                    />
                }
            </div>
        </Container>
    );
}
const Container = styled.div`
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
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #484848;
        border-radius: 10px;
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

// const ContentTitle = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   gap: 20px;
//   svg {
//     font-size: 25px;
//   }
//   input {
//     border: none;
//     outline: none;
//     background: transparent;
//     padding: 2px;
//     width: 40px;
//     font-size: 28px;
//   }
// `;
// const ContainerEmojiPicker = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
// `;