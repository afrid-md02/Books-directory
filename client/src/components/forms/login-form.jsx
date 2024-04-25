import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import ContextApi from "../../context/context-api";
import SubmitButton from "../buttons/submit-btn";
import LoadingButton from "../buttons/loading-btn";
import CommonInput from "../label and inputs/common-input";
import PasswordInput from "../label and inputs/password-input";
import serverUrl from "../../utils/url";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToken } = useContext(ContextApi);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      if (userData.password.trim().length < 6) {
        throw new Error("Password must be min:6 characters");
      }
      const response = await axios.post(`${serverUrl}/signin`, userData);
      if (response.status === 200) {
        setIsLoading(false);
        const data = await response.data;
        localStorage.setItem("token", `${data.token}`);
        await addToken(data.token);
        return history.replace("/");
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
      <Link
        to="/forgot-password"
        className="text-end py-2 text-blue-500 hover:underline hover:text-blue-800"
      >
        Forgot Password ?
      </Link>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Validating details..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Login</SubmitButton>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
