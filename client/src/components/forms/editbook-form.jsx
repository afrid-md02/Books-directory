import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FilePenLine } from "lucide-react";

import ContextApi from "../../context/context-api";
import LoadingButton from "../buttons/loading-btn";
import serverUrl from "../../utils/url";

function EditBookForm({ _id, title, author, category, description }) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(ContextApi);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const bookData = Object.fromEntries(fd.entries());
    try {
      if (bookData.title.trim().length < 4) {
        throw new Error("Title must be min:4 characters");
      }
      if (bookData.author.trim().length < 5) {
        throw new Error("Author name must be min:5 characters");
      }
      if (bookData.description.trim().length < 6) {
        throw new Error("Description must be min:6 characters");
      }

      const response = await axios.put(
        `${serverUrl}/book/edit/${_id}`,
        bookData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        const data = await response.data;
        toast.success(`${data.message}`, {
          position: "top-center",
        });
        return history.push("/admin/books");
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
      <strong className="text-sm md:text-base font-semibold font-Poppins">
        Note: You could not change the book image.
      </strong>
      <div className="flex flex-col space-y-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
          placeholder="title of the book"
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          className="border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
          placeholder="author of the book"
          defaultValue={author}
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="border-2 px-1 py-2 placeholder:text-sm border-slate-600 outline-none"
          defaultValue={category}
          required
        >
          <option value="Action-or-adventure">Action/adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Love-or-romance">Love/romance</option>
          <option value="Story">Story</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="description about this book"
          className="min-h-32 border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
          defaultValue={description}
          required
        ></textarea>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Adding a new data..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-4 bg-slate-950 border-2 text-bone_white border-slate-950 p-2 rounded-md hover:bg-slate-700 duration-500 hover:border-slate-700 sm:w-auto sm:px-6"
          >
            <p>Save changes</p>
            <FilePenLine />
          </button>
        </div>
      )}
    </form>
  );
}

export default EditBookForm;
