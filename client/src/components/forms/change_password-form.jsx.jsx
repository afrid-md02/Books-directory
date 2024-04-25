import { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "sonner";

import ContextApi from "../../context/context-api";
import PasswordInput from "../label and inputs/password-input";
import SubmitButton from "../buttons/submit-btn";
import LoadingButton from "../buttons/loading-btn";
import serverUrl from "../../utils/url";

function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState();
  const history = useHistory();
  const { token } = useContext(ContextApi);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const passwordData = Object.fromEntries(fd.entries());
    try {
      if (
        passwordData.newPassword.trim() !==
        passwordData.confirmNewPassword.trim()
      ) {
        throw new Error("New passwords must match!");
      }
      const response = await axios.put(
        `${serverUrl}/update-password`,
        passwordData,
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
        return history.push("/admin/profile");
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
          content="Old password"
          htmlFor="oldPassword"
          name="oldPassword"
          placeholder="enter old password"
          id="oldPassword"
          autoComplete="current-password"
        />
      </div>
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
          <LoadingButton content="Changing password..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <SubmitButton>Change Password</SubmitButton>
        </div>
      )}
    </form>
  );
}

export default ChangePasswordForm;
