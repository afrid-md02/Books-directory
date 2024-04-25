import { useEffect, useState } from "react";
import Image1 from "../../images/book-1.webp";
import Image2 from "../../images/book-2.webp";
import Image3 from "../../images/book-3.webp";
import "./image-slider.css";

const images = [
  {
    image: Image1,
    alt: "Book one",
  },
  {
    image: Image2,
    alt: "Book two",
  },
  {
    image: Image3,
    alt: "Book three",
  },
];

function ImageSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow opacity-0 flex justify-center items-center relative w-full lg:w-1/2 h-72 sm:h-80 md:h-96 animate-slideup [--slideup-delay:600ms] md:[--slideup-delay:900ms] md:bg-custom_blue rounded">
      {images.map((image, index) => {
        return (
          <img
            key={index}
            src={image.image}
            alt={image.alt}
            className={
              index === imageIndex
                ? "active w-[288px] h-[275px] md:w-[400px] md:h-[350px]"
                : "w-[288px] h-[275px] md:w-[400px] md:h-[350px]"
            }
          />
        );
      })}
    </div>
  );
}

export default ImageSlider;
