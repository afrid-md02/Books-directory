function BookContent({ title, author, category, description }) {
  return (
    <div className="w-full h-full space-y-2">
      <div className="opacity-0 space-y-1 animate-slideup [--slideup-delay:700ms]">
        <h2 className="text-base font-serif sm:text-lg underline">Title</h2>
        <p className="text-sm sm:text-base">{title}</p>
      </div>
      <div className="opacity-0 space-y-1 animate-slideup [--slideup-delay:800ms]">
        <h2 className=" text-base font-serif sm:text-lg underline">Author</h2>
        <p className="text-sm sm:text-base">{author}</p>
      </div>
      <div className="opacity-0 space-y-1 animate-slideup [--slideup-delay:900ms]">
        <h2 className=" text-base font-serif sm:text-lg underline">Category</h2>
        <p className="text-sm sm:text-base">{category}</p>
      </div>
      <div className="opacity-0 space-y-1 animate-slideup [--slideup-delay:1000ms]">
        <h2 className="text-base font-serif sm:text-lg underline">
          Description
        </h2>
        <p className="text-sm md:tracking-wide sm:text-base">{description}</p>
      </div>
      <p className="opacity-0 text-base font-Poppins sm:text-base mt-2 animate-slideup [--slideup-delay:1000ms]">
        You can read more on{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://en.wikipedia.org/wiki/${title}`}
          className="underline underline-offset-1 text-blue-900 hover:text-blue-600"
        >
          wikipedia
        </a>
      </p>
    </div>
  );
}

export default BookContent;
