import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useHistory, useLocation } from "react-router-dom";

import serverUrl from "../../utils/url";

function BooksFilterForm({ booksData }) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const category = queryParameters.get("books");

  const getBooksByCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const category = data.category.toString();
    try {
      const response = await axios.get(`${serverUrl}/books/${data.category}`);
      if (response.status === 200) {
        setIsLoading(false);
        const data = await response.data;
        booksData(data);
        return history.replace({
          pathname: "/",
          search: `?books=${category}`,
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
    <form
      className="w-full flex flex-col items-center py-2 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
      onSubmit={getBooksByCategory}
    >
      <span className="w-full flex justify-center items-center space-x-2 sm:w-auto">
        <label
          className="text-xs font-Poppins font-semibold sm:text-sm"
          htmlFor="category"
        >
          Browse by category:
        </label>
        <select
          name="category"
          id="category"
          className="text-xs font-Poppins px-1 py-0.5 rounded outline-none  sm:text-sm border-2 border-slate-950"
          defaultValue={
            category === null || category === undefined ? "All" : category
          }
          required
        >
          <option value="All">All</option>
          <option value="Action-or-adventure">Action/adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Love-or-romance">Love/romance</option>
          <option value="Story">Story</option>
        </select>
      </span>
      <span className="w-full flex items-center justify-center sm:w-auto">
        {isLoading ? (
          <button
            type="button"
            className="flex items-center justify-center space-x-2 p-1 px-8 font-Poppins text-xs rounded-sm bg-slate-700  text-bone_white duration-500  sm:text-sm hover:cursor-not-allowed"
            disabled
          >
            <Loader2 className="animate-spin w-5 h-5" />
            <p>Filtering</p>
          </button>
        ) : (
          <button
            type="submit"
            className="p-1 px-8 font-Poppins text-xs rounded-sm bg-slate-950 hover:bg-slate-700 text-bone_white duration-500  sm:text-sm"
          >
            Filter
          </button>
        )}
      </span>
    </form>
  );
}

export default BooksFilterForm;
