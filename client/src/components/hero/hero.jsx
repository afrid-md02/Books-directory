import ImageSlider from "../image slider/image-slider";
import HeroText from "./hero text/hero-text";

function Hero() {
  return (
    <section className="py-2 flex flex-col justify-center items-center w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-0 lg:space-x-4 lg:space-x-reverse lg:h-[calc(100vh-5rem)] lg:flex-row-reverse">
      <ImageSlider />
      <HeroText />
    </section>
  );
}

export default Hero;
