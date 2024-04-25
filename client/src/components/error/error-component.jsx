import { FlameKindling } from "lucide-react";
import { Link } from "react-router-dom";

function ErrorComponent() {
  return (
    <section className="py-4 space-y-4">
      <div className="p-1 flex justify-center items-center space-x-2">
        <FlameKindling className="w-8 h-auto md:w-10" color="#b9324f" />
        <h3 className="font-serif font-semibold text-base md:text-lg">
          404 Page Not Found!
        </h3>
      </div>
      <h6 className="justify-center flex font-Poppins text-sm md:text-base space-x-2">
        <p>return to</p>
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-900 underline underline-offset-2"
        >
          homepage
        </Link>
      </h6>
    </section>
  );
}

export default ErrorComponent;
