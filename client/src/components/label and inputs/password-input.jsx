import { useState } from "react";

import PasswordButton from "../buttons/password-btn";

function Password({ content, htmlFor, name, id, placeholder, autoComplete }) {
  const [hide, setHide] = useState(true);

  const passwordHandler = () => {
    setHide((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={htmlFor}>{content}</label>
      <span className="flex border-2 border-slate-600 items-center">
        <input
          type={hide ? "password" : "text"}
          name={name}
          id={id}
          className="w-full px-1 py-2 placeholder:text-sm outline-none focus-within:bg-slate-300"
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        <PasswordButton hide={hide} passwordHandler={passwordHandler} />
      </span>
    </div>
  );
}

export default Password;
