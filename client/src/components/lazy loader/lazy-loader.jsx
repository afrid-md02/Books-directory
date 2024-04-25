import Thinking from "../../assets/Thinking image.svg";

function LazyLoader() {
  return (
    <figure className="mt-16 md:mt-20 p-2 py-6 md:py-12 w-full flex justify-center items-start min-h-[calc(100vh-3.25rem)]">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-custom_blue"></div>
        <img src={Thinking} className="rounded-full h-28 w-28" />
      </div>
    </figure>
  );
}

export default LazyLoader;
