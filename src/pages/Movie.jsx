import { useState } from "react";
import { useUploadReview } from "../features/authentication/useUploadReview";
import { useParams } from "react-router";
import useGetMovie from "../features/movies/useGetMovie";

function Movie() {
    const [review,setReview]=useState('')
    const {uploadReview,isPending}=useUploadReview()
    const {movieId}=useParams()
    const{movie}=useGetMovie(movieId,true)
    console.log(movie)
    return (
        <div className=" pt-20">
             <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadReview({review,movieId})
        }}
      >
        <input
          value={review} className=" text-black"
          onChange={(e) => setReview(e.target.value)}
          type="text"
        />
        <button>submit</button>
      </form>
        </div>
    )
}

export default Movie
