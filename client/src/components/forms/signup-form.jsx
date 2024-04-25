import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import SubmitButton from "../buttons/submit-btn";
import LoadingButton from "../buttons/loading-btn";
import PasswordInput from "../label and inputs/password-input";
import CommonInput from "../label and inputs/common-input";
import serverUrl from "../../utils/url";

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());

    try {
      if (userData.name.trim().length < 5) {
        throw new Error("Name must be min:5 characters");
      }
      if (userData.password.trim().length < 6) {
        throw new Error("Password must be min:6 characters");
      }
      if (userData.password.trim() !== userData.confirmPassword.trim()) {
        throw new Error("Password must match");
      }
      const response = await axios.post(`${serverUrl}/signup`, userData);
      if (response.status === 201) {
        setIsLoading(false);
        const data = await response.data;
        toast.success(`${data.message}`, {
          position: "top-center",
        });
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
        content="Name"
        htmlFor="name"
        type="text"
        name="name"
        id="name"
        placeholder="enter your name"
        autoComplete="username"
      />

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

      <PasswordInput
        content="Confrim Password"
        htmlFor="confirmPassword"
        name="confirmPassword"
        placeholder="confirm password"
        id="confirmPassword"
        autoComplete="new-password"
      />
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Validating details..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Create account</SubmitButton>
        </div>
      )}
    </form>
  );
}

export default SignupForm;
