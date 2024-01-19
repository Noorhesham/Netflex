import { useMutation } from "@tanstack/react-query";
import { UploadReview } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUploadReview(){
    const {
        mutate: uploadReview,
        isPending,
      } = useMutation({
        mutationFn: ({review,movieId}) => {
            UploadReview({review,movieId})},
        onSuccess: () => {
          toast.success("Review uploaded sucessfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
      return { uploadReview, isPending };
}