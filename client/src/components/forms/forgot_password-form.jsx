import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import CommonInput from "../label and inputs/common-input";
import LoadingButton from "../buttons/loading-btn";
import SubmitButton from "../buttons/submit-btn";
import serverUrl from "../../utils/url";

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      const response = await axios.post(
        `${serverUrl}/forgot-password`,
        userData
      );
      if (response.status === 200) {
        setIsLoading(false);
        const data = await response.data;
        toast.success(`${data.message}`, {
          position: "top-center",
        });
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
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Sending email..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Send link to email</SubmitButton>
        </div>
      )}
    </form>
  );
}

export default ForgotPasswordForm;
