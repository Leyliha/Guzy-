/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./slider.css";
import MenuItem from "../menu-item/MenuItem";

export default function Slider(props) {
  const { slides } = props;
  const [step, setStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? slides.length - step : (prev) => prev - 1
    );
  };
  const nextSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === slides.length - step ? 0 : (prev) => prev + 1
    );
  }, [currentSlide, slides.length, step]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);
  useEffect(() => {
    const getSlides = () => {
      if (slides.length % 3 === 0) {
        setStep(1);
      } else if (slides.length % 3 === 1) {
        setStep(3);
      } else if (slides.length % 3 === 2) {
        setStep(2);
      } else {
        setStep(1);
      }
    };
    getSlides();
  }, [slides.length]);

  return (
    <div className="slidercontainer">
      <div
        className="sliderwrapper"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(calc(-${(currentSlide * 33.5) / slides.length}%))`,
        }}
      >
        {slides.map((slide) => (
          <div
            className="slidercontent"
            key={slide._id}
            style={{ width: `calc(${33.5 / slides.length}%)` }}
          >
            <MenuItem dish={slide} />
          </div>
          // <div
          //   key={slide._id}
          //   className="slidercontent"
          //   style={{ width: `${100 / slides.length}%` }}
          // >
          //   {slide.content}
          // </div>
        ))}
      </div>
      <div className="arrowcontainer">
        <AiOutlineArrowLeft className="arrow" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow" onClick={nextSlide} />
      </div>
    </div>
  );
}
