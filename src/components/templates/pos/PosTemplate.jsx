import { Detail } from "./components/Detail"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { PosKeyboard } from "./components/PosKeyboard"
import Search from "./components/Search"
import "./styles/style.css"

export const PosTemplate = () => {

    return (
        <div className="containerTemplate overflow-y-auto">
            <section className="header">
                <Header />
            </section>

            <section className="search">
                <Search />
            </section>

            <section className="detail">
                <div className="flex w-full md:w-7/12 lg:w-9/12 p-1">
                    <Detail />  
                </div>
                <div className="posKeyboard">
                    <PosKeyboard />
                </div>
            </section>

            <section className="footer">
                <Footer />    
            </section>

        </div>
    )
}

