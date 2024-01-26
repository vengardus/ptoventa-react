import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    //EffectCards,
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import Arrow from "../../assets/Arrow.svg";
import { Device } from "../../styles/breakpoints";


/*****************
props:
    images      :   Array strings con las urls de las imagenes
    widthTablet :   Ancho del box para el carrusel para pantallas >= tablet (en unidades vh)
                    Sirve para carrusel que solo ocupa parte de la pantalla, por lo que debe enviarse
                    un valor del tamaño que se ajuste al ancho del carrusel.
                    (el ancho del Box solo funciona con vh. No encontré otra solución. Pendiente revisar
    texts       :   Array de strings con texto que se superponen al carrusel
    typeText    :   Tipo de funcionalidad para la forma de mostrar texts
********************/
export function CarouselGen({ images, widthTablet, texts = null, typeTexts = '1' }) {
    return (
        <Container>
            <Box $widthTablet={widthTablet}>
                <Swiper
                    // install Swiper modules
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[
                        //EffectCards,
                        Navigation,
                        Pagination,
                        Scrollbar,
                        Autoplay,
                        A11y,
                    ]}
                    navigation={true}
                    pagination={{ type: "fraction" }}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    speed={1000}
                >
                    {
                        images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} />
                                <SwiperTexts texts={texts} typeTexts={typeTexts} />
                            </SwiperSlide> 

                        ))
                    }
                </Swiper>
            </Box>
        </Container>
    );
}


const SwiperTexts = ({ texts, typeTexts }) => {
    return (
        <ContentSwiperTexts>
            {
                texts && typeTexts == '1' &&
                // En un cuadro de fondo rojo con bordes redondeados a la derecha
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    marginTop: '1rem',
                    color: 'white',
                    backgroundColor: `#9A0401`,
                    display: 'flex',
                    flexDirection: 'column',
                    borderEndEndRadius: '80px',
                    borderTopRightRadius: '80px',
                    padding: '0.3rem 3rem',
                    textAlign:'left',
                    lineHeight:'1.2',
                    fontWeight:'600'
                }}>
                    {
                        texts.map((text, index) => (
                            <span key={index} style={{ fontSize: (!index)? '4.5rem':'3rem', textAlign:'center' }}>{text}</span>
                        ))
                    }
                </div>
            }
        </ContentSwiperTexts>
    )
}




const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* background-color: skyblue; */
`;

const ContentSwiperTexts = styled.div`
    display: none; 
    @media ${Device.laptop} {
        display: block;
    }
`


const Box = styled.div`
    height: 100%;
    /* width:100vw; */
    width: 100vw;
    /* background-color: green; */
    max-width: 100%;
    @media ${Device.tablet} {
        height: 100%;
        width: ${(props) => props.$widthTablet};
        /* width: 94.2415183vw; */
        /* width: 100vw; */
    } 
    /* @media (max-width: 70em) {
        height: 40vh;
    } */
    .swiper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow:hidden;
        img {
            display: block;
            height: 100%;
            width: 100%;
            object-fit: content;
        }
    }
    .swiper-button-next {
        color: ${(props) => props.theme.text};
        right: 0;
        width: 4rem;
        top: 60%;
        background-image: url(${Arrow});
        background-position: center;
        background-size: cover;
        &:after {
            display: none;
        }
        @media (max-width: 64em) {
            width: 3rem;
        }
        @media (max-width: 30em) {
            width: 2rem;
        }
    }
    .swiper-button-prev {
        color: ${(props) => props.theme.text};
        right: 0;
        width: 4rem;
        top: 60%;
        background-image: url(${Arrow});
        background-position: center;
        background-size: cover;
        transform: rotate(180deg);
        &:after {
            display: none;
        }
        @media (max-width: 64em) {
            width: 3rem;
        }
        @media (max-width: 30em) {
            width: 2rem;
        }
    }
  .swiper-wrapper {
    transition-timing-function: linear;
 }
`;

