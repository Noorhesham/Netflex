import { API_KEY, BASE_URL, RESTRICT } from "../utils/Constans";
import { getMovieDetailsmini } from "./apiMovie";

export async function searchForMovieOnly(query,genre,pageParam, ) {
    try {
      if(RESTRICT.includes(query.trim())){
       throw new Error("this search key word is not allowed") 
      } 
      const res = await fetch(`${BASE_URL}/search/movie?query=${query}&page=${pageParam}&api_key=${API_KEY}&adult=false`);
      const data = await res.json();
      let results=data.results.filter(d=>d.backdrop_path);
      if(genre)   results=data.results.filter(result=>result?.genre_ids?.some(g=>g===+genre))
      const Detailedresults = await Promise.all(results.map((d) =>getMovieDetailsmini(d.id)));
      const  filtered=Detailedresults.filter(m=>m.backdrop_path)
      return filtered;
    } catch (err) {
      throw new Error(err);
    }
  }
  