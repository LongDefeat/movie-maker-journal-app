import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 *
 * Static class tying together methods used to get/send
 * to my API. No front-end specific work here, and there
 * is not any API-aware work elsewhere in frontend.
 *
 */

class MovieDatabaseApi {
  //the token used for interactions with API stored here
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call: ", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${MovieDatabaseApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log(err);
      console.error("API Error: ", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API Routes

  /** Get movie */
  static async getMovie(movie_id) {
    let res = await this.request(`/moviedb/movie/${movie_id}`, { movie_id });
    console.log(res.data);
    return res.data;
  }

  /** Get Popular Movies on Mount */
  static async getPopMovies() {
    let res = await this.request(`/moviedb/popular`);
    return res;
  }

  /** Get Upcoming Movies on Mount */
  static async getUpcomingNewMovies() {
    let res = await this.request(`/moviedb/upcoming`);
    return res;
  }

  /** Get Movie Recommendations */
  static async getMovieRecommendations(movie_id) {
    console.log("hello world");
    let res = await this.request(`/moviedb/movie/${movie_id}/recommendations`);
    console.log(res);
    return res.results;
  }

  /** Search movie */
  static async searchMovie(searchText) {
    let res = await this.request(`/moviedb/search/`, { searchText });
    return res;
  }

  /** Get Genres of movies */
  static async getGenres() {
    let res = await this.request(`/moviedb/genres/`);
    return res;
  }
}
/** Get movie ratings */
//   static async getMovieRating(movie_id){
//     let res = await this.request(``)
//   }
// }
// router.get("/movie/:movie_id/ratings", async (req, res, next) => {

//   let res = await this.request(`moviedb/`)
// });

/** uri encode component if search movie path doesn't work (turns space into %20) */
export default MovieDatabaseApi;
