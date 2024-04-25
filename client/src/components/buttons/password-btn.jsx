import { Eye, EyeOff } from "lucide-react";

function PasswordButton({ hide, passwordHandler }) {
  return (
    <button
      title="password-show/hide-btn"
      className="bg-white h-full w-10 p-2 md:p-1"
      onClick={() => passwordHandler()}
      type="button"
    >
      {hide && <Eye className="h-full w-full" />}
      {!hide && <EyeOff className="h-full w-full" />}
    </button>
  );
}

export default PasswordButton;
