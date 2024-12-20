import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../api/query/bookQuery";
import {useEffect} from "react"
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const { user } = useUser();

  const { data: featuredBooks } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
    onError: (error) => {
      toast.error("Failed to load books.");
      console.error(error);
    },
  });

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
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="472"
        height="535"
        viewBox="0 0 472 535"
        className="absolute right-0 z-[-1] top-16 hidden sm:block"
      >
        <g fill="none" fill-rule="evenodd">
          <path fill="#FFF" d="M-968-52H472v4897H-968z" />
          <path
            fill="#FF500A"
            d="M681.106 165.51c-30.371-14.67-63.96-16.585-97.134-14.382 60.2-37.603 118.702-76.922 172.875-124.317 11.08-9.693 19.201-30.696 21.84-44.78 3.765-20.11.12-40.355-8.84-58.47-17.102-34.602-51.973-53.312-90.306-52.198-73.519 2.143-145.675 17.55-216.696 36.801 54.426-40.978 106.327-85.315 150.464-137.245 24.6-28.948 29.777-69.311 13.005-103.248-16.442-33.259-52.545-55.313-90.31-52.196-194.45 16.035-377.365 98.872-557.65 167.383-45.838 17.42-76.995 70.986-58.096 119.114C-61.66-51.992-9.6-21.35 39.342-39.947c24.782-9.419 49.534-18.946 74.291-28.47-32.025 26.777-62.515 55.3-90.298 86.635C-1.74 46.5-6.138 88.152 10.331 121.468c17.773 35.964 51.5 51.246 90.307 52.199 45.046 1.102 89.799-3.479 134.116-11.354-29.039 25.978-55.813 54.305-78.93 85.76-22.895 31.15-30.825 67.199-13.004 103.245 17.963 36.337 51.39 50.664 90.308 52.2 55.799 2.196 110.795-8.957 164.793-21.978 11.787-2.846 23.521-5.886 35.237-9.008-3.14 3.125-6.274 6.268-9.429 9.38-34.956 34.45-29.227 102.098 8.282 132.293 41.883 33.708 94.838 28.574 132.274-8.31 51.126-50.379 104.48-102.946 147.126-160.888 18.853-25.615 31.827-53.464 30.044-86.337-2.086-38.5-25.177-76.167-60.35-93.16z"
          />
        </g>
      </svg>
      <div className="md:flex p-6 md:p-10 lg:p-36 w-full" data-aos="fade-up">
        <div className="space-y-6 w-[100%] md:w-[80%]">
          <h1 className="text-4xl md:text-6xl text-[#ff6023] font-bold">
            Hi, We're Books World.
          </h1>
          <h3 className="text-black text-lg md:text-2xl">
            The World's largest Books store
          </h3>
          <p className="text-sm sm:text-xl text-gray-600">
            Home to 100 million people¹ who love original stories, Books World
            has democratized storytelling for a new generation of diverse Gen Z
            writers and their fans.
          </p>

          {user ? (
            <div className="flex gap-4 text-white">
              <Link
                to={"/books"}
                className="text-xs md:text-sm bg-[#ff6023] px-8 py-2 rounded-lg hover:shadow-lg"
              >
                Start Reading
              </Link>
              {user && user.userType === "admin" && (
                <Link
                  to={"/books/add"}
                  className="text-xs md:text-sm bg-[#ff6023] px-8 py-2 rounded-lg hover:shadow-lg"
                >
                  Add Your Book
                </Link>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="p-0 pt-10 max-md:hidden">
          <img src="/hero-devices.png" alt="" className="" />
        </div>
      </div>
      {user ? (
        <>
          {" "}
          <h1 className="pl-4 md:pl-0 text-lg md:text-2xl font-semibold mb-4">
            Featured Books
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBooks &&
              featuredBooks
                .slice(0, 3)
                .map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
