import { useLocation } from "react-router-dom";
import EditBookForm from "../../components/forms/editbook-form";

function EditBookPage() {
  const location = useLocation();
  const book = location.state;

  return (
    <main className="pt-16 pb-8 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-[calc(100vh-3.25rem)]">
      <section className="flex flex-col items-center justify-center py-4 space-y-4">
        {book === undefined ? (
          <p className="px-1 py-2 w-full font-Poppins text-sm md:text-base text-red-600 text-center">
            No book found.
          </p>
        ) : (
          <>
            <div className="flex justify-center w-full p-1">
              <img
                src={book.imageUrl}
                alt="book"
                className="opacity-0 w-full sm:max-w-xs animate-slideup [--slideup-delay:600ms]"
              />
            </div>
            <EditBookForm
              _id={book._id}
              title={book.title}
              author={book.author}
              category={book.category}
              description={book.description}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default EditBookPage;
