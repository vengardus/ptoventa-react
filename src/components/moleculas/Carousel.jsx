import styled from "styled-components";
import {
  EffectCards,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import img1 from "../../assets/ruleta/ruleta9.png";
import img2 from "../../assets/ruleta/ruleta8.png";
import img3 from "../../assets/ruleta/ruleta5.png";
import img4 from "../../assets/ruleta/ruleta6.png";
import img5 from "../../assets/ruleta/ruleta7.png";
import Arrow from "../../assets/Arrow.svg";
export function Carousel() {
  return (
    <Container>
      <Swiper
        // install Swiper modules
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        modules={[
          EffectCards,
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
        ]}
        navigation={true}
        pagination={{ type: "fraction" }}
        scrollbar={{ draggable: true }}
        effect={"cards"}
      >
        <SwiperSlide>
          <img src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}
const Container = styled.div`
  width: 20vw;
  height: 50vh;
  @media (max-width: 70em) {
    height: 40vh;
    padding: 15px 0;
  }
  @media (max-width: 64em) {
    height: 50vh;
    width: 30vw;
  }
  @media (max-width: 48em) {
    height: 35vh;
    width: 40vw;
  }
  @media (max-width: 30em) {
    height: 35vh;
    width: 40vw;
  }
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
      object-fit: contain;
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

`;