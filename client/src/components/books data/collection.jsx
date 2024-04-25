import { useState } from "react";

import Heading from "./heading/heading";
import Books from "./books/books";
import BooksFilterForm from "../forms/books_filter-form";

function Collection() {
  const [books, setBooks] = useState([]);

  const booksData = (books) => {
    setBooks(books);
  };

  return (
    <section
      id="browse-collection"
      className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
    >
      <Heading />
      <BooksFilterForm booksData={booksData} />
      <Books books={books} setBooks={setBooks} />
    </section>
  );
}

export default Collection;
