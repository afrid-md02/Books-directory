import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "sonner";

import Book from "../single book/book";
import Loader from "../../loader/loader";
import serverUrl from "../../../utils/url";

function Books({ books, setBooks }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const category = queryParameters.get("books");

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${serverUrl}/books/${
            category === null || category === undefined ? "All" : category
          }`
        );
        if (response.status === 200) {
          setIsLoading(false);
          const data = await response.data;
          setBooks(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="px-1 py-2 w-full font-Poppins text-sm md:text-base text-red-600 text-center">
        Failed to fetch books data, please try again after some time.
      </p>
    );
  }

  return (
    <>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start place-items-center gap-10 w-full px-4 pt-6 md:pt-12 pb-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {books.map((book) => {
            return (
              <Book
                _id={book._id}
                key={book._id}
                title={book.title}
                author={book.author}
                imageUrl={book.imageUrl}
                description={book.description}
              />
            );
          })}
        </div>
      ) : (
        <h5 className="w-full text-center font-Poppins text-sm p-2 sm:py-4 sm:text-base md:text-lg md:py-6 lg-md:py-8">
          No books found.
        </h5>
      )}
    </>
  );
}

export default Books;
