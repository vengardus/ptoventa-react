import { useForm } from "react-hook-form";
import { InputText } from "./ui/InputText";
import { v } from "../../../styles/variables";
import { BtnSave } from "../../moleculas/BtnSave";
import { useEffect } from "react";

export const LoginForm = () => {
    const {
        register,
        formState: { errors },
        //handleSubmit,
        setFocus
    } = useForm();

    useEffect(() => {
        setFocus('email')
    }, [setFocus])


    return (
        <form className="flex flex-col gap-y-5">
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
    );
};
