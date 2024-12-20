import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 200,
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className="border p-4 rounded-2xl shadow cursor-pointer bg-white hover:shadow-xl transition-all grid grid-cols-5 gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#E03737] group" data-aos="fade-down"
      onClick={handleClick}
    >
      <div className="col-span-2">
        <img
          src={book.coverImageUrl}
          alt="cover-image"
          className="w-full h-[15rem] object-fit rounded-lg transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="col-span-3">
        <div>
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p className="text-gray-600 text-sm">by {book.author}</p>
          <p className="line-clamp-6 leading-tight text-sm mt-2">
            {book.description}
          </p>
        </div>
        <div>
          <p className="mt-4 text-sm italic">{book.genre}</p>
          <Link to={`/books/${book._id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
