import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import ContextApi from "../../../context/context-api";
import serverUrl from "../../../utils/url";

function AdminBook({
  _id,
  title,
  author,
  category,
  imageUrl,
  removeBook,
  description,
}) {
  const history = useHistory();
  const { token } = useContext(ContextApi);

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`${serverUrl}/book/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 201) {
        removeBook(id);
        const data = await response.data;
        console.log(data);
        toast.success(`${data.message}`, {
          position: "top-center",
        });
      }
    } catch (err) {
      let message = err?.response?.data?.error;
      if (!message) {
        message = err.message;
      }
      toast.error(message, {
        position: "top-right",
      });
    }
  };

  const editBook = (book) => {
    history.push({ pathname: `/admin/edit-book/${book._id}`, state: book });
  };

  return (
    <div className="max-w-64 opacity-0 animate-slidedown [--slidedown-delay:600ms]">
      <div className="group relative">
        <Link to={`/book/${_id}`} className="m-0 p-0">
          <img
            src={imageUrl}
            className="w-full h-full object-cover rounded shadow"
          />
        </Link>
        <div className="bottom-0 right-0 left-0 absolute w-full bg-black bg-opacity-70 p-2 h-32 text-bone_white font-Poppins flex opacity-0 group-hover:opacity-100 duration-500">
          <span className="w-full h-full space-y-2">
            <p className="text-lg">Author</p>
            <p className="text-start font-serif">-{author}</p>
          </span>
          <span className="w-full flex justify-end items-start p-2">
            <Bookmark className="w-10 h-auto" />
          </span>
        </div>
      </div>
      <h2 className="font-serif py-4 font-semibold md:text-lg">{title}</h2>
      <div className="flex space-x-4 text-sm md:text-base">
        <button
          type="button"
          className="text-center text-bone_white rounded-md w-full bg-yellow-600 font-Poppins px-1 py-2 hover:bg-yellow-700 duration-500 text-sm md:text-base"
          onClick={() =>
            editBook({ _id, title, author, description, category, imageUrl })
          }
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteBook(_id)}
          className="text-bone_white rounded-md w-full bg-custom_pink font-Poppins px-1 py-2 hover:bg-pink-800 duration-500 text-sm md:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminBook;
