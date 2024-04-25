import AdminBooks from "./admin books/admin-books";
import Heading from "./heading/heading";

function Collection() {
  return (
    <section className="pt-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
      <Heading />
      <AdminBooks />
    </section>
  );
}

export default Collection;
