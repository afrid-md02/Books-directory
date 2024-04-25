import { MoveRight } from "lucide-react";

function ExploreButton() {
  const scrollToBrowseCollection = () => {
    const collection = document.getElementById("browse-collection");
    collection.scrollIntoView();
  };
  return (
    <button
      onClick={scrollToBrowseCollection}
      className="group opacity-0 bg-custom_blue text-bone_white flex justify-center items-center space-x-4 px-2 py-3 rounded w-full sm:max-w-xs hover:bg-[#0a2390] duration-500 animate-slideup [--slideup-delay:800ms]"
    >
      <p className="text-sm tracking-widest font-Poppins md:text-base lg:text-lg">
        Explore
      </p>
      <MoveRight className="h-6 w-auto fill-bone_white group-hover:translate-x-4 duration-500" />
    </button>
  );
}

export default ExploreButton;
