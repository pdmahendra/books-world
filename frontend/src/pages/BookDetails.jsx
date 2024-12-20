import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/query/bookQuery";
import { getReviewsByBookId } from "../api/query/reviewQuery";
import { getAllBooks } from "../api/query/bookQuery";
import BookCard from "../components/BookCard";
import ReviewComponent from "../components/ReviewComponent";
import SkeletonComponent from "../components/Skeleton";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading: bookLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    onError: (error) => {
      toast.error("Failed to load books.");
      console.error(error);
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByBookId(id),
    onError: (error) => {
      toast.error("Failed to load books.");
      console.error(error);
    },
  });

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
    onError: (error) => {
      toast.error("Failed to load books.");
      console.error(error);
    },
  });

  return (
    <div className="h-full p-4 md:grid md:grid-cols-2 max-w-7xl mx-auto gap-x-12 cursor-pointer">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="472"
        height="535"
        viewBox="0 0 472 535"
        className="absolute right-0 z-[-1] top-16"
      >
        <g fill="none" fill-rule="evenodd">
          <path fill="#FFF" d="M-968-52H472v4897H-968z" />
          <path
            fill="#FF500A"
            d="M681.106 165.51c-30.371-14.67-63.96-16.585-97.134-14.382 60.2-37.603 118.702-76.922 172.875-124.317 11.08-9.693 19.201-30.696 21.84-44.78 3.765-20.11.12-40.355-8.84-58.47-17.102-34.602-51.973-53.312-90.306-52.198-73.519 2.143-145.675 17.55-216.696 36.801 54.426-40.978 106.327-85.315 150.464-137.245 24.6-28.948 29.777-69.311 13.005-103.248-16.442-33.259-52.545-55.313-90.31-52.196-194.45 16.035-377.365 98.872-557.65 167.383-45.838 17.42-76.995 70.986-58.096 119.114C-61.66-51.992-9.6-21.35 39.342-39.947c24.782-9.419 49.534-18.946 74.291-28.47-32.025 26.777-62.515 55.3-90.298 86.635C-1.74 46.5-6.138 88.152 10.331 121.468c17.773 35.964 51.5 51.246 90.307 52.199 45.046 1.102 89.799-3.479 134.116-11.354-29.039 25.978-55.813 54.305-78.93 85.76-22.895 31.15-30.825 67.199-13.004 103.245 17.963 36.337 51.39 50.664 90.308 52.2 55.799 2.196 110.795-8.957 164.793-21.978 11.787-2.846 23.521-5.886 35.237-9.008-3.14 3.125-6.274 6.268-9.429 9.38-34.956 34.45-29.227 102.098 8.282 132.293 41.883 33.708 94.838 28.574 132.274-8.31 51.126-50.379 104.48-102.946 147.126-160.888 18.853-25.615 31.827-53.464 30.044-86.337-2.086-38.5-25.177-76.167-60.35-93.16z"
          />
        </g>
      </svg> */}
      <div className="md:border-r-2 border-gray-300 md:pr-12">
        {bookLoading ? (
          <div>
            <SkeletonComponent className="h-screen rounded-3xl" />
          </div>
        ) : (
          <>
            {" "}
            {data ? (
              <div className="">
                <div className="flex gap-x-8">
                  {" "}
                  <img
                    src={data.coverImageUrl}
                    alt=""
                    className="h-[15rem] object-contain w-auto rounded-lg transform transition-transform duration-300 hover:scale-110"
                  />
                  <div className="">
                    <h1 className="text-2xl font-bold mt-4 transform transition-transform duration-300 hover:scale-110">
                      {data.title}
                    </h1>
                    <p className="text-gray-600 text-sm transform transition-transform duration-300 hover:scale-110">
                      by {data.author}
                    </p>
                    <p className="mt-4 italic text-sm text-blue-500 transform transition-transform duration-300 hover:scale-110">
                      {data.genre}
                    </p>
                  </div>
                </div>
                <p className="mt-8">{data.description}</p>
                <h2 className="text-xl font-bold mt-4">Reviews</h2>
                {reviews && reviews.length > 0 ? (
                  <>
                    {" "}
                    <ul>
                      {reviews &&
                        reviews.map((r) => (
                          <li key={r._id} className=" py-2">
                            <strong>{r.userId.fName}</strong>: {r.comment}
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <div className="italic mt-2"> No Reviews Available</div>
                )}
              </div>
            ) : (
              <p className="text-red-500">Book not found.</p>
            )}
          </>
        )}

        <div className="mt-6">
          <ReviewComponent />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          {" "}
          <h1 className="text-2xl font-semibold mb-4 pl-2 max-md:mt-16">Books List</h1>
          <Link to={"/books"} className="hover:underline">
            see more
          </Link>
        </div>
        <div>
          {isLoading ? (
            <div className="space-y-10">
              <SkeletonComponent className="w-full h-[15rem] rounded-3xl" />
              <SkeletonComponent className="w-full h-[15rem] rounded-3xl" />
              <SkeletonComponent className="w-full h-[15rem] rounded-3xl" />
            </div>
          ) : (
            <div className="space-y-10">
              {books?.slice(0, 2).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
