import { Loader as LoaderSvg } from "lucide-react";

function Loader() {
  return (
    <div className="p-2 py-6 md:py-12 w-full flex justify-center">
      <div
        aria-label="Loading..."
        role="status"
        className="flex space-x-2 justify-center items-center"
      >
        <LoaderSvg
          className="w-8 h-8 aspect-[1] animate-spin md:h-12 md:w-12"
          color="#0a2342"
        />
        <span className="animate-pulse font-Poppins text-xs sm:text-sm md:text-base">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Loader;
