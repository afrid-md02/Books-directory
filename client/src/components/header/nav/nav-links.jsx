import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import ContextApi from "../../../context/context-api";
import LogoutButton from "../buttons/logout-btn";

function NavLinks({ isOpen, setIsOpen }) {
  const { pathname } = useLocation();
  const { isLoggedin } = useContext(ContextApi);

  const handleNavClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isLoggedin && (
        <>
          <NavLink
            onClick={handleNavClick}
            to="/admin/add-book"
            className={`${
              pathname === "/admin/add-book"
                ? "active-for-loginlinks"
                : "opacity-0 hover:text-yellow-500 md:px-1 md:py-1 md:border-b-2 md:border-b-transparent md:hover:border-b-2 md:hover:border-slate-950 duration-500 md:hover:text-slate-950 animate-slidedown [--slidedown-delay:300ms]"
            }`}
          >
            Add book
          </NavLink>
          <NavLink
            onClick={handleNavClick}
            to="/admin/profile"
            className={`${
              pathname === "/admin/profile"
                ? "active-for-loginlinks"
                : "opacity-0 hover:text-yellow-500 md:px-1 md:py-1 md:border-b-2 md:border-b-transparent md:hover:border-b-2 md:hover:border-slate-950 duration-500 md:hover:text-slate-950 animate-slidedown [--slidedown-delay:400ms]"
            }`}
          >
            Profile
          </NavLink>
          <LogoutButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
      {!isLoggedin && (
        <>
          <NavLink
            onClick={handleNavClick}
            to="/login"
            className={`${
              pathname === "/login"
                ? "opacity-0 text-yellow-500 md:bg-inherit md:px-6 md:py-1 md:border-2 md:border-slate-950 duration-500 md:hover:bg-slate-950 md:text-slate-950 md:hover:text-bone_white animate-slidedown [--slidedown-delay:300ms]"
                : "opacity-0 hover:text-yellow-500 md:bg-inherit md:hover:bg-slate-950 md:px-6 md:py-1 md:border-2 md:border-slate-950 duration-500  md:hover:text-bone_white animate-slidedown [--slidedown-delay:300ms]"
            }`}
          >
            Login
          </NavLink>
          <NavLink
            onClick={handleNavClick}
            to="/signup"
            className={`${
              pathname === "/signup"
                ? "opacity-0 text-yellow-500 md:text-bone_white md:bg-slate-950 md:px-6 md:py-1 md:border-2 md:border-slate-950 duration-500 md:hover:bg-inherit md:hover:text-slate-950 animate-slidedown [--slidedown-delay:400ms]"
                : "opacity-0 hover:text-yellow-500 md:text-bone_white md:bg-slate-950 md:px-6 md:py-1 md:border-2 md:border-slate-950 duration-500 md:hover:bg-inherit md:hover:text-slate-950 animate-slidedown [--slidedown-delay:400ms]"
            }`}
          >
            Signup
          </NavLink>
        </>
      )}
    </>
  );
}

export default NavLinks;
