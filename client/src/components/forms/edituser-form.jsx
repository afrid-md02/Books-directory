import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import ContextApi from "../../context/context-api";
import LoadingButton from "../buttons/loading-btn";
import UpdateButton from "../buttons/update.btn";
import CancelButton from "../buttons/cancel-btn";
import serverUrl from "../../utils/url";

function EditUserForm({ userName, cancel, setEditUser, setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(ContextApi);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      if (userData.name.trim().length < 5) {
        throw new Error("Name must be min:5 characters");
      }
      const response = await axios.put(`${serverUrl}/update-user`, userData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 201) {
        setIsLoading(false);
        setEditUser(false);
        const data = await response.data;
        setUser({ name: data.user.name, email: data.user.email });
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
    <form onSubmit={submitHandler} className="w-full p-2 space-y-2">
      <input
        name="name"
        type="text"
        defaultValue={userName}
        className="font-Poppins w-full border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
        placeholder="enter new name"
        autoComplete="username"
        required
      />
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Updating details..." />
        </div>
      ) : (
        <div className="flex space-x-4 text-sm md:text-base">
          <CancelButton cancel={cancel} />
          <UpdateButton />
        </div>
      )}
    </form>
  );
}

export default EditUserForm;
