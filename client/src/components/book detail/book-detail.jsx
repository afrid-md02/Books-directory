import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import BookImage from "./book image/book-image";
import BookContent from "./book content/book-content";
import Loader from "../loader/loader";
import serverUrl from "../../utils/url";

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${serverUrl}/book/${bookId}`);
        if (response.status === 200) {
          setIsLoading(false);
          const data = await response.data;
          setBook(data.book);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err);
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
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="px-1 py-6 w-full font-Poppins text-sm md:text-base text-red-600 text-center">
        Failed to fetch book data. Please try again.
      </p>
    );
  }

  return (
    <section className="font-Poppins py-4 flex flex-col justify-center items-start w-full space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-0 lg:py-8 lg:space-x-4 lg:flex-row">
      {/*image of the book*/}
      <BookImage imageUrl={book.imageUrl} title={book.title} />
      {/*image content*/}
      <BookContent
        title={book.title}
        author={book.author}
        category={book.category}
        description={book.description}
      />
    </section>
  );
}

export default BookDetail;
