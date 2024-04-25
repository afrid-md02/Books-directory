import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import AdminBook from "../single book/admin-book";
import Loader from "../../loader/loader";
import ContextApi from "../../../context/context-api";
import serverUrl from "../../../utils/url";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useContext(ContextApi);

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${serverUrl}/admin-books`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setIsLoading(false);
          const data = await response.data;
          setBooks(data.books);
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
    getData();
    return () => {
      abortController.abort();
    };
  }, [token]);

  const removeBook = (id) => {
    setBooks((prev) => prev.filter((book) => book._id !== id));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="px-1 py-2 w-full font-Poppins text-sm md:text-base text-red-600 text-center">
        Failed to fetch your books data, please try again after some time.
      </p>
    );
  }

  return (
    <>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start place-items-center gap-10 w-full px-4 pt-6 md:pt-12 pb-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {books.map((book) => {
            return (
              <AdminBook
                key={book._id}
                _id={book._id}
                title={book.title}
                author={book.author}
                category={book.category}
                imageUrl={book.imageUrl}
                description={book.description}
                removeBook={removeBook}
              />
            );
          })}
        </div>
      ) : (
        <>
          <h5 className="flex flex-col space-y-2 w-full text-center font-Poppins text-sm p-2 sm:py-4 sm:text-base md:text-lg md:py-6 lg-md:py-8">
            <span className="w-full">No books found, add some.</span>
            <span className="w-full">
              Click here to{" "}
              <Link
                to="/admin/add-book"
                className="text-blue-400 hover:text-blue-900 underline underline-offset-2"
              >
                add.
              </Link>
            </span>
          </h5>
        </>
      )}
    </>
  );
}

export default AdminBooks;
