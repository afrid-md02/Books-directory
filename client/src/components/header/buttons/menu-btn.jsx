import { Menu, X } from "lucide-react";

function MenuButton({ isOpen, toggleNavbar }) {
  return (
    <button
      type="button"
      onClick={() => toggleNavbar()}
      className="bg-custom_blue w-full h-auto p-1 rounded md:hidden"
      title="menu-btn"
    >
      {isOpen ? <X color="#f9f6ee" /> : <Menu color="#f9f6ee" />}
    </button>
  );
}

export default MenuButton;
