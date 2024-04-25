import { Loader2 } from "lucide-react";

function LoadingButton({ content }) {
  return (
    <button
      type="button"
      className="font-Poppins flex justify-center items-center space-x-2 w-full bg-slate-700 border-2 text-bone_white border-slate-700 p-2 rounded-md sm:w-auto md:px-4 hover:cursor-not-allowed"
      disabled
    >
      <Loader2 className="h-5 w-auto animate-spin md:h-6" />
      <p className="text-sm md:text-base">{content}</p>
    </button>
  );
}

export default LoadingButton;
