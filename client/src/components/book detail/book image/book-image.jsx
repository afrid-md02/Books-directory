function BookImage({ imageUrl, title }) {
  return (
    <div className="w-full h-full flex justify-center">
      <img
        loading="lazy"
        src={imageUrl}
        alt={title}
        className="opacity-0 w-full max-w-sm animate-slideup [--slideup-delay:600ms]"
      />
    </div>
  );
}

export default BookImage;
