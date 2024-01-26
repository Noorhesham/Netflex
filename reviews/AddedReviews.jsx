import ReviewUser from "./ReviewUser";

function AddedReviews({ movie }) {
  const reviews = movie.accounts;
  return (
    <div className=" bg-black/30 p-1 rounded-md flex flex-col h-[10rem] overflow-y-scroll">
      {reviews?.map((review) => (
        <ReviewUser review={review} key={review} />
      ))}
    </div>
  );
}

export default AddedReviews;
