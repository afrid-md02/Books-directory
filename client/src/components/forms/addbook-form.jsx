import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import ContextApi from "../../context/context-api";
import LoadingButton from "../buttons/loading-btn";
import AddbookButton from "../buttons/addbook-btn";
import CommonInput from "../label and inputs/common-input";
import serverUrl from "../../utils/url";

function BookForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(ContextApi);
  const [selectedImage, setSelectedImage] = useState();
  const history = useHistory();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

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

      const response = await axios.post(`${serverUrl}/book`, bookData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
      console.log(err);
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
        content="Title"
        htmlFor="title"
        type="text"
        name="title"
        id="title"
        placeholder="title of the book"
      />
      <CommonInput
        content="Author"
        htmlFor="author"
        type="text"
        name="author"
        id="author"
        placeholder="author of the book"
      />
      <div className="flex flex-col space-y-1">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="border-2 px-1 py-2 placeholder:text-sm border-slate-600 outline-none"
          defaultValue=""
          required
        >
          <option hidden value="">
            Select category
          </option>
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
        <label htmlFor="image">Choose image</label>
        <input
          className="bg-white border-2 px-1 py-2 placeholder:text-sm border-slate-600 outline-none"
          type="file"
          name="image"
          id="image"
          onChange={imageChange}
          required
        />
        <strong>Note: Allowed formats are png, jpg, jpeg.</strong>
        {selectedImage && (
          <div className="flex flex-col justify-between items-center px-2 space-y-1">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
              className="h-32 w-auto md:h-40 object-contain"
            />
            <button
              onClick={removeSelectedImage}
              className="bg-custom_pink p-2 rounded text-bone_white text-xs md:text-sm"
            >
              Hide image preview
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="description about this book"
          className="min-h-32 border-2 px-1 py-2 placeholder:text-sm border-slate-600 focus-within:bg-slate-300 outline-none"
          required
        ></textarea>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingButton content="Adding a new book..." />
        </div>
      ) : (
        <div className="flex justify-center">
          <AddbookButton>Add Book</AddbookButton>
        </div>
      )}
    </form>
  );
}

export default BookForm;
