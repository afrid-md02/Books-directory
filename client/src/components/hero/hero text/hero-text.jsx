import ExploreButton from "../../buttons/explore-btn";

function HeroText() {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2 lg:w-1/2 lg:items-start">
      <h1 className="opacity-0 font-Poppins font-semibold tracking-wide text-lg sm:text-xl md:text-2xl xl:text-3xl animate-slideup [--slideup-delay:700ms] md:[--slideup-delay:600ms]">
        Welcome to BooksDirectory.com: Your Ultimate Destination for Literary
        Adventures{" "}
      </h1>
      <p className="opacity-0 font-Poppins tracking-wide text-sm sm:text-base md:text-lg animate-slideup [--slideup-delay:800ms] md:[--slideup-delay:700ms]">
        Are you an avid reader always on the lookout for your next great read?
        Look no further! BooksDirectory.com is your go-to destination for
        discovering and exploring a vast array of books across genres. Our
        comprehensive book directory brings together a world of literary
        treasures to cater to every readers taste.
      </p>
      <ExploreButton />
    </div>
  );
}

export default HeroText;
