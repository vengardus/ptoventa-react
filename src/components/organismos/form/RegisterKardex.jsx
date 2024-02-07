import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUserStore } from "../../../store/user.store";
import { useCompanyStore } from "../../../store/company.store";
import { APP_CONFIG} from "../../../utils/dataEstatica";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { v } from "../../../styles/variables";
import { ListGeneric } from "../ListGeneric";
import { useState } from "react";
import { FormContainer } from "./formr.style";
import { Searcher } from "../Searcher";
import { useProductStore } from "../../../store/ProductStore";
import { useKardexStore } from "../../../store/KardexStore";
import { modalAlert } from "../../../utils/modalAlert";



export function RegisterKardex({
    onClose,
    dataSelect,
    action,
    movementType
}) {
    const dataUser = useUserStore((state) => state.data)

    const insertKardex = useKardexStore((state) => state.insert)
    const dataCompany = useCompanyStore((state) => state.data)


    const setStrSearchProduct = useProductStore((state) => state.setStrSearch)
    const selectProduct = useProductStore((state) => state.selectProduct)
    const dataProduct = useProductStore((state) => state.data)
    const itemSelectProduct = useProductStore((state) => state.itemSelect)
    const [stateListProduct, setStateListProduct] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus
    } = useForm();

    const registerUser = async (data) => {
        if ( ! itemSelectProduct ) {
            modalAlert({
                type: 'warning',
                text: `Debe ingresar un producto.`
            })
            return
        }
        if (action === APP_CONFIG.actionCrud.insert) {
            const p = {
                date : new Date(),
                type: movementType,
                id_user: dataUser.id,
                id_product: itemSelectProduct.id,
                quantity: parseFloat(data.quantity),
                detail: data.detail,
                id_company: dataCompany.id
            };
            await insertKardex(p)
            onClose();
        }
    }

    useEffect(() => {
       if (action === APP_CONFIG.actionCrud.insert) 
            selectProduct(null)
        setFocus('name')

    }, [setFocus, action, selectProduct]);


    return (
        <FormContainer>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {movementType == APP_CONFIG.movementType.incoming ? "ENTRADA" : "SALIDA"}
                        </h1>
                    </section>
                    <section>
                        <h1>
                            {action == APP_CONFIG.actionCrud.update ? "Editar usuario" : "Registrar nueva usuario"}
                        </h1>
                    </section>

                    <section>
                        <span className="text-lg" onClick={onClose}>x</span>
                    </section>
                </div>

                {/* Search Product */}
                <div className="sectionSearcher flex justify-start  ">
                    <div onClick={() => setStateListProduct(!stateListProduct)}>
                        <Searcher
                            setSearcher={setStrSearchProduct}
                        />
                    </div>
                    {
                        stateListProduct &&
                        <ListGeneric
                            data={dataProduct ?? []}
                            setState={() => setStateListProduct(!stateListProduct)}
                            func={selectProduct}
                            scroll={scroll}
                            bottom={'-250px'}
                        />
                    }
                </div>

                {
                    itemSelectProduct &&
                    <CardProduct>
                        <span style={{ color: "#1fee61", fontWeight: "bold" }}>
                            {itemSelectProduct.description}
                        </span>
                        <span style={{ color: "#f6faf7" }}>
                            stock actual: {itemSelectProduct.stock}
                        </span>
                    </CardProduct>
                }


                <form className="formulario" onSubmit={handleSubmit(registerUser)}>

                    <section>
                        {/* quantity */}
                        <article>
                            <InputText icono={<v.iconocalculadora />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.quantity}
                                    type="number"
                                    placeholder=""
                                    {...register("quantity", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Cantidad</label>
                                {errors.quantity?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* detail */}
                        <article>
                            <InputText icono={<v.iconotodos />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.datail}
                                    type="text"
                                    placeholder=""
                                    {...register("detail", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Motivo</label>
                                {errors.detail?.type === "required" && <p>Campo requerido</p>}
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
            </div>
        </FormContainer>
    );
}

const CardProduct = styled.section`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed #54f04f;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
  margin-bottom: 8px;
`;