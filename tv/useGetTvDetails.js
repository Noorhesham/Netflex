import { useQuery } from "@tanstack/react-query";
import { getTvDetails } from "../services/apiMovie";
import { useParams } from "react-router";

export default function useGetTvDetails() {
  const {showId}=useParams()
   const {
    data: show,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>getTvDetails(showId), queryKey: ["show",showId] });
  return { show, error, isLoading };
}
