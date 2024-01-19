import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../services/apiMovie";

export default function useGetMovie(id,publicMovie) {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>getMovieDetails(id,publicMovie), queryKey: ["movie"] });
  return { movie, error, isLoading };
}
