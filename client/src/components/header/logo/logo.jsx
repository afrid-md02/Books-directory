import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex w-auto space-x-2">
      <Link to="/" title="navigate-home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="opacity-0 h-12 w-auto md:h-16 fill-custom_blue animate-slidedown [--slidedown-delay:300ms]"
        >
          <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" />
        </svg>
      </Link>
      <h2 className="opacity-0 hidden sm:flex justify-start items-center font-Protest text-lg px-2 border-l-2 border-slate-500 md:text-xl lg:text-2xl animate-slidedown [--slidedown-delay:200ms]">
        Books directory
      </h2>
    </div>
  );
}

export default Logo;