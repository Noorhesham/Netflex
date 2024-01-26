import { IMAGE_URL } from "../../utils/Constans";
import MovieOverview from "../movies/MovieOverview";

function ReviewUser({ review }) {
  console.log(review.avatar_url);
  return (
    <div className="flex items-stretch text-lg gap-2 p-1 ">
      <div className="max-w-[2rem]">
        <img
          className=" rounded-md object-cover "
          src={
            review?.author_details?.avatar_path
              ? `${IMAGE_URL}${review?.author_details?.avatar_path}`
              : review?.avatar_url
              ? review?.avatar_url
              : `/avatar1.jpg`
          }
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-1">
        <h4 className=" text-gray-200">
          {review?.author || review?.full_name}
        </h4>
        {review.rating && <span>{review.rating}</span>}
        {
          <MovieOverview
            small={true}
            overview={review?.content || review.reviews}
          />
        }
      </div>
    </div>
  );
}

export default ReviewUser;
