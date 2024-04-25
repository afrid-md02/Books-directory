import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import PasswordInput from "../label and inputs/password-input";
import SubmitButton from "../buttons/submit-btn";
import LoadingButton from "../buttons/loading-btn";
import { toast } from "sonner";
import serverUrl from "../../utils/url";

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { token, userId } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      if (userData.newPassword.trim().length < 6) {
        throw new Error("New password must be min:6 characters");
      }
      if (userData.newPassword.trim() !== userData.confirmNewPassword.trim()) {
        throw new Error("Password must match");
      }

      const response = await axios.post(
        `${serverUrl}/reset-password/${userId}`,
        userData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

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
      <div className="flex flex-col space-y-1">
        <PasswordInput
          content="New password"
          htmlFor="newPassword"
          name="newPassword"
          placeholder="enter new password"
          id="newPassword"
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <PasswordInput
          content="Confirm new password"
          htmlFor="confirmNewPassword"
          name="confirmNewPassword"
          placeholder="confirm new password"
          id="confirmNewPassword"
          autoComplete="new-password"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Resetting password..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Reset Password</SubmitButton>
        </div>
      )}
    </form>
  );
}

export default ResetPasswordForm;
