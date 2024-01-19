import { API_KEY, BASE_URL, YOUTUBE_URL } from "../utils/Constans";
import { shuffle } from "../utils/helpers";
import supabase from "./supabase";

export async function getPublicDetails(id){
      let { data: profiles, error } = await supabase
  .from('profiles')
  .select("*")
  // Filters
  if(error) throw new Error(error.message)

  // console.log(profiles.map(profile=>JSON.parse(profile.reviews)).flat(1).filter(review=>review.movieId===id))
  //get all profiles that rated this movie 
  const profileRev= profiles.filter(profile=>JSON.parse(profile.reviews).flat(1).filter(review=>review.movieId===id))
  //get all reviews 
  const reviews=profiles.map(profile=>JSON.parse(profile.reviews)).flat(1).filter(r=>r.movieId===id).map(r=>r.review);
  profileRev.forEach((profile,i)=>{
    profile.reviews=reviews[i];
  })
  // console.log(reviews)
  // const reviews= JSON.parse(profiles.reviews.map(profile=>profile.reviews)).filter(review=>review.movieId===id).map(obj=>obj.review)
  // console.log(JSON.parse(profiles.reviews.map(profile=>profile.reviews)).filter(review=>review.movieId===id))

return {accounts:profileRev}
}
export async function getMovieDetails(id,publicMovie=false) {
  try {
    const res = await fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`
    );
    const movie = await res.json();
    const links = movie.videos.results.map((v) => `${YOUTUBE_URL}${v.key}`);
    const result = { ...movie, links };
    if(publicMovie){
      const publicData= await getPublicDetails(id);
      console.log(publicData)
      return {...movie,links,...publicData}
      }
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getTvDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`
    );
    const movie = await res.json();
    const links = movie.videos.results.map((v) => `${YOUTUBE_URL}${v.key}`);
    const result = { ...movie, links };
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getFeaturedMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetails(data.id))
    );
    shuffle(results)
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getPlayingMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetails(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getMovieUpcoming(page) {
  try {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetails(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getGenres() {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getSuperHeroMovies() {
  try {
    // 9717 9715
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&with_keywords=180547&&9715&&9717`
    );
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetails(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getAnime(page) {
  try {
    console.log(page)
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&with_genres=16&with_keywords=210024&&240875`
    );
    const data = await res.json();
    const results = await Promise.all(
      data?.results?.map((data) => getTvDetails(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}


export async function searchForMovie(query,pageParam,title=false ) {
  try {
    const res = await fetch(`${BASE_URL}search/multi?query=${query}&page=${pageParam}&api_key=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    const {total_pages,total_results}=data
    const results = await Promise.all(data?.results?.map((d) => d.media_type==='tv'?getTvDetails(d.id):d.media_type==='movie'?getMovieDetails(d.id):""));
    if(title) return {total_pages,total_results}
    return results;
  } catch (err) {
    throw new Error(err);
  }
}


export async function getAllGenres() {
  try {
    const res = await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres;
  } catch (err) {
    throw new Error(err);
  }
}
