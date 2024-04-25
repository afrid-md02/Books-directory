import Logo from "./logo/logo";
import Nav from "./nav/nav";

function MainHeader() {
  return (
    <header className="bg-bone_white fixed flex-wrap top-0 z-20 mx-auto flex w-full align-middle justify-between border-b-2 border-slate-500 py-2 font-Poppins px-4 sm:px-6 md:px-8 md:shadow-md md:border-none lg:shadow-lg lg:px-10 xl:px-12">
      <Logo />
      <Nav />
    </header>
  );
}

export default MainHeader;
