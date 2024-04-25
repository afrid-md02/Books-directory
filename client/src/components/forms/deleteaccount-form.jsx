import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import ContextApi from "../../context/context-api";
import LoadingButton from "../buttons/loading-btn";
import CommonInput from "../label and inputs/common-input";
import PasswordInput from "../label and inputs/password-input";
import serverUrl from "../../utils/url";

function DeleteAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { token, removeToken } = useContext(ContextApi);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      if (userData.password.trim().length < 6) {
        throw new Error("Password must be min:6 characters");
      }
      const response = await axios.post(`${serverUrl}/delete-user`, userData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 201) {
        setIsLoading(false);
        const data = await response.data;
        toast.success(`${data.message}`, {
          position: "top-center",
        });
        await removeToken();
        localStorage.removeItem("token");
        return history.replace("/login");
      }
    } catch (err) {
      setIsLoading(false);
      let message = err?.response?.data?.error;
      if (!message) {
        message = err.message;
      }
      toast.error(message, {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-style">
      <CommonInput
        content="Email"
        htmlFor="email"
        type="email"
        name="email"
        id="email"
        placeholder="abc@gmail.com"
        autoComplete="off"
      />
      <PasswordInput
        content="Password"
        htmlFor="password"
        name="password"
        placeholder="enter your password"
        id="password"
        autoComplete="current-password"
      />
      <strong className="flex items-center space-x-2 text-sm md:text-base font-semibold font-Poppins">
        Warning: Your data will be wiped permanently.
      </strong>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Deleting Account..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-Poppins w-full bg-custom_pink border-2 text-bone_white border-custom_pink p-2 rounded-md hover:bg-pink-800 duration-500 hover:border-pink-800 sm:w-2/5 hover:scale-105"
          >
            Confirm
          </button>
        </div>
      )}
    </form>
  );
}

export default DeleteAccountForm;
