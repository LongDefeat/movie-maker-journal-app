import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class UserDatabaseApi {
    // token for interactions with the User Database
    static token;

    static async request(endpoint, data = {}, method='get'){
        console.debug("User API Call: ", endpoint, data, method);
        const url = `${BASE_URL}${endpoint}`;
        const headers = {};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err){
            console.log(data);
            console.error("API Error: ", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // INDIVIDUAL API ROUTES

    // ===================USER ROUTES======================

    /** Get current user. */

    static async getCurrentUser(username){
        let res = await this.request(`/users/${username}`);
        console.log("getCurrentUser ", res.user);
        return res.user;
    }


    // ===================FUNCTIONAL ROUTES======================

    /** Get token for login from username, password */
    static async login(data) {
        let res = await this.request(`/auth/token`, data, "post");
        return res.token;
    }

    /** Update profile username/password */
    static async profile(username, data){
        let res = await this.request(`/users/${username}`, data, "patch");
        return res.updateProfile;
    }

    /** Signup for site. */
    static async signup(data) {
        let res = await this.request(`/auth/register`, data, "post");
        return res.token;
    }

// ===================JOURNAL ENTRY ROUTES======================

    /** Get all Journal entries */
    static async getEntries(user_id){
        let res = await this.request(`/journals/${user_id}/journal-entries`);
        return res.journalEntries;
    }

    /** Create Journal entry */
    static async journalMovieReview(user_id, data){
        let res = await this.request(`/journals/${user_id}`, data, "post");
        return res.journalEntry;
    }

    /** Delete Journal entry */
    static async deleteEntry(entry_id, data){
        let res = await this.request(`/journals/${entry_id}`, data, "delete");
        return res.journalEntry;
    }

// ===================FAVORITES ROUTES======================

    /** Add favorite movie */
    static async addFavorite(user_id, movie_id){
        console.log("addFavorite called", movie_id);
        let res = await this.request(`/movies/${user_id}/favorites/${movie_id}`, movie_id, "post");
        return res.favorites;
    }

    /** Get favorites list */
    static async getFavorites(user_id){
        let res = await this.request(`/movies/${user_id}/favorites`);
        return res.favorites;
    }

// ===================SEEN MOVIE ROUTES======================
    /** Add seen movie */
    static async addSeen(user_id, movie_id){
        console.log("addSeen called", movie_id);
        let res = await this.request(`/movies/${user_id}/seen/${movie_id}`, movie_id, "post");
        return res.seen;
    }

    /** Get seen movies list */
    static async getSeenMovies(user_id){
        console.log("getSeenMovies in UserDatabaseAPI running:",user_id)
        let res = await this.request(`/movies/${user_id}/seen`)
        return res.seen;
    }

// ===================RATING ROUTES======================

    /** Rate a movie. */

    static async rateMovie(movie_id){
        let res = await this.post(`/movies/${movie_id}/rating`);
        return res.movie_id;
}

    /** Delete movie rating. */
    
    static async deleteMovieRating(movie_id){
        let res = await this.delete(`/movies/${movie_id}/rating`)
        return res.movie_id;
    } 
   
}

export default UserDatabaseApi;