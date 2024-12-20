import { useUser } from "../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByUserId } from "../api/query/reviewQuery";
const UserProfile = () => {
  const { user } = useUser();
  const { data: reviews } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getReviewsByUserId,
    onError: (error) => {
      toast.error("Failed to load books.");
      console.error(error);
    },
  });

  return (
    <div className=" max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      {" "}
      <h1 className="text-2xl font-bold text-center">Profile</h1>
      <div className="flex justify-center mt-10">
        <img
          src={user?.imageUrl}
          alt="profile-img"
          className="rounded-full h-[100px] w-[100px] flex"
        />
      </div>
      <p className="text-center mt-4">
        {user?.fName} {user?.lName}
      </p>
      <p className="text-center">{user?.email}</p>
      <h2 className="text-xl font-bold mt-10 text-ce">Your Reviews</h2>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <li key={review._id} className="border-b py-2">
              <span className="font-medium">{review?.bookId?.title}</span> :{" "}
              {review?.comment}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserProfile;
