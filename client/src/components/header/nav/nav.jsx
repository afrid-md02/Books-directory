import { useState } from "react";

import NavLinks from "./nav-links";
import MenuButton from "../buttons/menu-btn";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="w-auto">
        <div className="hidden md:flex h-full items-center justify-between space-x-8">
          <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="md:hidden w-full h-full flex items-center">
          <MenuButton isOpen={isOpen} toggleNavbar={toggleNavbar} />
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center p-2 pt-8 basis-full space-y-4 md:hidden animate-linksAnimation">
          <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
}

export default Nav;
