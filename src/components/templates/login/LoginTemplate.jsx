import { BtnSave } from "../../moleculas/BtnSave";
import { FooterLogin } from "../../organismos/sidebar/FooterLogin";
import { v } from "../../../styles/variables";
import { Line } from "../../atomos/Line";
import { useAuthWithGoogleStore } from "../../../stores/authWithGoogle.store";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { LoginForm } from "../../organismos/forms/LoginForm";


export function LoginTemplate() {
    const signInWithGoogle = useAuthWithGoogleStore((state) => state.signInWithGoogle);

    return (
      <div className="loginContainerTemplate">

            <div className="w-[100%] md:w-[400px]">

                <div className="flex align-middle justify-center m-[1.5rem] gap-[0.7rem] items-center">
                    <img className="w-[10%]" src={v.logo} />
                    <span className="font-700">{APP_CONFIG.appName}</span>
                </div>

                <div className="font-700 text-[1.7rem] pb-[1rem]">Ingresar</div>

                <LoginForm />

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
        </div>
    );
}

