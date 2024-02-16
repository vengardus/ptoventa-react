import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "./style";
import { useModuleStore } from "../../../stores/module.store";


export function ConfigTemplate() {
    const dataModule = useModuleStore((state) => state.data)


    useEffect(() => {
        const handleMouseMove = (e) => {
            document.querySelectorAll(".card").forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        };

        const cardsContainer = document.getElementById("cards");
        if (cardsContainer) {
            cardsContainer.addEventListener("mousemove", handleMouseMove);

            return () => {
                cardsContainer.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, []);

    return (
        <Container>
            <div id="cards">
                {dataModule.map((item, index) => {
                    return (
                        <Link
                            to={item.link}
                            className={item.state ? "card" : "card false"}
                            key={index}
                        >
                            <div className="card-content">
                                <div className="card-image">
                                    <img src={item.icon} />
                                </div>

                                <div className="card-info-wrapper">
                                    <div className="card-info">
                                        <i className="fa-duotone fa-unicorn"></i>
                                        <div className="card-info-title">
                                            <h3>{item.name}</h3>
                                            <h4>{item.description}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Container>
    );
}
