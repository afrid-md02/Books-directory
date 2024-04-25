import { CheckCircle2 } from "lucide-react";

function AddbookButton({ children }) {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center space-x-4 bg-slate-950 border-2 text-bone_white border-slate-950 p-2 rounded-md hover:bg-slate-700 duration-500 hover:border-slate-700 sm:w-auto sm:px-6"
    >
      <p>{children}</p>
      <CheckCircle2 />
    </button>
  );
}

export default AddbookButton;
