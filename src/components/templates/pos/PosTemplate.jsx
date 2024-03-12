import { Detail } from "./components/Detail"
import { Header } from "./components/Header"
import { PosKeyboard } from "./components/PosKeyboard"
import "./styles/style.css"

export const PosTemplate = () => {

    return (
        <div className="containerTemplate">
            <section className="header">
                <Header />
            </section>

            <section className="detail">
                <div className="flex w-9/12 p-1">
                    <Detail />  
                </div>
                <div className="posKeyboard">
                    <PosKeyboard />
                </div>
            </section>

            <section className="footer">
                FOOTER !!!
            </section>

        </div>
    )
}

