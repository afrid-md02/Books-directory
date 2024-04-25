import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { UserRoundCheck } from "lucide-react";
import { toast } from "sonner";

import EditUserForm from "../../components/forms/edituser-form";
import ContextApi from "../../context/context-api";
import Loader from "../loader/loader";
import serverUrl from "../../utils/url";

function ProfileCard() {
  const [user, setUser] = useState({});
  const [edituser, setEditUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useContext(ContextApi);

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${serverUrl}/user-profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200) {
          setIsLoading(false);
          const data = await response.data;
          setUser(data);
        }
      } catch (err) {
        setIsLoading(false);
        setError(true);
        let message = err?.response?.data?.error;
        if (!message) {
          message = err.message;
        }
        toast.error(message, {
          position: "top-right",
        });
      }
    };
    getUser();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = () => {
    setEditUser(false);
  };

  const showForm = () => {
    setEditUser(true);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <p className="px-1 py-2 w-full font-Poppins text-sm md:text-base text-red-600 text-center">
        Failed to fetch your data, please try logging in again.
      </p>
    );
  }

  return (
    <div className="opacity-0 w-full bg-[#fffafa] p-4 border-2 border-gray-200 rounded-lg shadow-lg space-y-8 sm:max-w-sm md:max-w-md animate-slideup [--slideup-delay:600ms]">
      <div className="flex justify-between items-center space-x-4  pb-4 border-b-2 border-slate-400">
        <h2 className="font-Poppins  text-xl sm:text-2xl md:text-3xl">
          User details
        </h2>
        <UserRoundCheck className="w-10 h-auto md:w-14" color="rgb(20 83 45)" />
      </div>
      <div className="space-y-2 font-Poppins text-sm tracking-wide md:text-base">
        <h5>
          Name: <strong className="font-semibold">{user.name}</strong>
        </h5>
        <h5>
          Email: <strong className="font-semibold">{user.email}</strong>
        </h5>
      </div>
      <div className="flex justify-center items-center border-b-2 border-slate-400 pb-6">
        {edituser ? (
          <EditUserForm
            cancel={cancel}
            userName={user.name}
            setUser={setUser}
            setEditUser={setEditUser}
          />
        ) : (
          <button
            onClick={showForm}
            className="w-full bg-yellow-600 text-sm p-2 rounded text-bone_white md:w-auto md:px-8 font-Poppins md:text-base hover:bg-yellow-700 duration-500"
          >
            Edit details
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <Link
          to="/admin/books"
          className="text-sm text-center p-2 font-Poppins hover:underline hover:underline-offset-2 md:text-base hover:text-blue-600"
        >
          View your books
        </Link>
        <Link
          to="/admin/change-password"
          className="text-sm text-center p-2 font-Poppins hover:underline hover:underline-offset-2 md:text-base hover:text-blue-600"
        >
          Change your password
        </Link>
        <Link
          to="/admin/delete-account"
          className="text-sm text-center p-2 font-Poppins hover:underline hover:underline-offset-2 md:text-base hover:text-blue-600"
        >
          Delete my account
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
