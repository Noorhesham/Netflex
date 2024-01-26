import { API_KEY, BASE_URL, RESTRICT,  } from "../utils/Constans";
import { shuffle } from "../utils/helpers";
import { getUser } from "./apiAuth";
import supabase from "./supabase";

export async function getPublicDetails(id){
      let { data: profiles, error } = await supabase
  .from('profiles')
  .select("*")
  // Filters
  if(error) throw new Error(error.message)

  // console.log(profiles.map(profile=>JSON.parse(profile.reviews)).flat(1).filter(review=>review.movieId===id))
  //get all profiles that rated this movie 
  const profileRev= profiles.filter(profile=>JSON.parse(profile.reviews).flat(1).some(review=>review.movieId===id))
  //get all reviews 
  const reviews=profiles.map(profile=>JSON.parse(profile.reviews)).flat(1).filter(r=>r.movieId===id).map(r=>r.review);
  profileRev.forEach((profile,i)=>{
    profile.reviews=reviews[i];
  })
  console.log(profiles,profileRev,reviews)
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
    const result = { ...movie };
    if(publicMovie){
      const publicData= await getPublicDetails(id);
      // console.log(publicData)
      return {...movie,...publicData}
      }
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getMovieDetailsmini(id) {
  try {
    const res = await fetch(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos,recommendations`
    );
    const movie = await res.json();
    const result = { ...movie };
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getHomeMovies(arr){
  try{
    const results = await Promise.all(
      arr.map(mov=>mov.type==='tv'?getTvDetails(mov.id):getMovieDetails(mov))
    );
    const shuffled=shuffle(results)
    return shuffled
  }catch(err){
    throw new Error(err)
  }
}
export async function getEpisodiesSeason(id,num){
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}/season/${num}?api_key=${API_KEY}`
    );
    const result = await res.json();

    return result;
  } catch (err) {
    throw new Error(err);
  }

}
export async function getTvDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits,episode_groups`
    );
    const movie = await res.json();
    const result = { ...movie };
    const episodies=await Promise.all(result.seasons.map(season=>getEpisodiesSeason(result.id,season.season_number)))
    const results={...movie,episodies}
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getTvDetailsmini(id) {
  try {
    const res = await fetch(
      `${BASE_URL}tv/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const movie = await res.json();
    const result = { ...movie };
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
      data.results.map((data) => getMovieDetailsmini(data.id))
    );
    return shuffle(results);
  } catch (err) {
    throw new Error(err);
  }
}
export async function getPopularMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}/movie//popular?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();    
    const results=data.results.filter(result=>result?.genre_ids?.every(g=>!(g===10749)))
    const resultsFilter = await Promise.all(
      results.map((data) => getMovieDetailsmini(data.id))
    );
    return resultsFilter;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getPlayingMovies(page) {
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const results = await Promise.all(
      data.results.map((data) => getMovieDetailsmini(data.id))
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
      data.results.map((data) => getMovieDetailsmini(data.id))
    );
    return results;
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
      data.results.map((data) => getMovieDetailsmini(data.id))
    );
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
export async function getAnime(page) {
  try {
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


export async function searchForMovie(query,genre,pageParam, ) {
  try {
    if(RESTRICT.includes(query.trim())){
     throw new Error("this search key word is not allowed") 
     
    } 
    const res = await fetch(`${BASE_URL}search/multi?query=${query}&page=${pageParam}&api_key=${API_KEY}&adult=false`);
    const data = await res.json();
    let results=data.results.filter(d=>d.backdrop_path);
    if(genre)   results=data.results.filter(result=>result?.genre_ids?.some(g=>g===+genre))
    // if((title&&genre!=='')) return results.length
    
    const Detailedresults = await Promise.all(results.map((d) => d.media_type==='tv'?getTvDetailsmini(d.id):d.media_type==='movie'?getMovieDetailsmini(d.id):""));
    const  filtered=Detailedresults.filter(m=>m.backdrop_path)

    // if(genre) filtered=filtered.filter(result=>result.genres.some(g=>g.id===+genre))
    return filtered;
  } catch (err) {
    throw new Error(err);
  }
}


export async function getAllGenres() {
  try {

    const res = await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres.filter(g=>g.id!==10749&&g.id!==53);

  } catch (err) {
    throw new Error(err);
  }
}

export async function getWatchLater(){
  const user = await getUser()
  const likedMovies=user.user_metadata.likedMovies
  const results=await Promise.all(likedMovies.filter(res=>res.id).map(movie=>movie.media==='tv'?getTvDetailsmini(movie.id):getMovieDetailsmini(movie.id)))
  return results
}
export async function getCollection(id){
  const res = await fetch(`${BASE_URL}collection/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    return data
}
export async function getCompany(id){
  const res = await fetch(`${BASE_URL}company/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    return data
}
export async function getRecommendations({pageParam,id}){
  const res = await fetch(`${BASE_URL}movie/${id}/recommendations?api_key=${API_KEY}&page=${pageParam}`);
    const data = await res.json();
    return data.results
}
export async function getRecommendationsTv({pageParam,id}){
  const res = await fetch(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&page=${pageParam}`);
    const data = await res.json();
    return data.results
}
export async function getEpisodeDetails(id,seasonNum,episodeNum){
  const res = await fetch(`${BASE_URL}/tv/${id}/season/${seasonNum}/episode/${episodeNum}?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`);
    const data = await res.json();
    return data
}


  export async function searchActor(){
    const res = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`);
      const data = await res.json();
      console.log(data)
      return data
    }
    export async function popularActor(){
      const res = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&append_to_response=recommendations,videos,reviews,similar,images,keywords,credits`);
        const data = await res.json();
        console.log(data)
        return data.results
}
export async function getcompany(id){
  const res = await fetch(`${BASE_URL}/company/${id}?api_key=${API_KEY}&append_to_response=tv_credits,videos,latest,movie_credits,images,keywords,credits`);
    const data = await res.json();
    console.log(data)
    return data
}
export async function getPerson(id){
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=tv_credits,videos,latest,movie_credits,images,keywords,credits`);

    const data = await res.json();
    return data
}