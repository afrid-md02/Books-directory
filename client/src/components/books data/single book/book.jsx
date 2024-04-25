import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

function Book(props) {
  return (
    <div className="max-w-64 opacity-0 animate-slidedown [--slidedown-delay:600ms]">
      <div className="group relative">
        <Link to={`/book/${props._id}`} className="m-0 p-0 ">
          <img
            src={props.imageUrl}
            className="w-full h-full object-cover rounded shadow"
            alt="book"
          />
        </Link>
        <div className="bottom-0 right-0 left-0 absolute w-full bg-black bg-opacity-70 p-2 min-h-28 text-bone_white font-Poppins flex opacity-0 group-hover:opacity-100 duration-500">
          <span className="w-full h-full space-y-2">
            <p className="text-lg">Author</p>
            <p className="text-start font-serif">-{props.author}</p>
          </span>
          <span className="w-full flex justify-end items-start p-2">
            <Bookmark className="w-10 h-auto" />
          </span>
        </div>
      </div>
      <h2 className="font-serif py-4 font-semibold md:text-lg">
        {props.title}
      </h2>
    </div>
  );
}
export default Book;
