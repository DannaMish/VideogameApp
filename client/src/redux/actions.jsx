import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME"
export const FILTER_VIDEOGAMES_BY_GENRE = "FILTER_VIDEOGAMES_BY_GENRE"
export const SORT_VIDEOGAMES_BY_NAME = "SORT_VIDEOGAMES_BY_NAME"

export const SET_CURRENTPAGE = "SET_CURRENTPAGE"

export const GET_GENRES = "GET_GENRES"

export const getVideogames = () => {
     return async function (dispatch) {
        const videogamesAPI = await axios.get("http://localhost:3001/videogames");
        const videogames = videogamesAPI.data;
        dispatch( {type: GET_VIDEOGAMES, payload: videogames } );
     }
};

export const getVideogamesByName = (search) => {
   return async function(dispatch) {
      const videogamesAPI = await axios.get(`http://localhost:3001/videogames?name=${search}`);
      const videogames = videogamesAPI.data;
      console.log(videogames)
      dispatch( {type: GET_VIDEOGAMES_BY_NAME, payload: videogames} )
   }
}

export const filterVideogamesByGenre = (genre ) => {
   return function(dispatch) {
      dispatch( { type: FILTER_VIDEOGAMES_BY_GENRE, payload: genre  })
   }
}

export const sortVideogamesByName = (order) => {
   return function(dispatch) {
      dispatch({ type: SORT_VIDEOGAMES_BY_NAME, payload: order})
   }
}



export const setCurrentPage = (page) => {
   return function (dispatch) {
      dispatch( {type: SET_CURRENTPAGE, payload: page  })
   }
}


export const getGenres = () => {
   return async function(dispatch) {
      const genresAPI = await axios.get(`http://localhost:3001/genres`);
      const genres = genresAPI.data;
      dispatch( { type: GET_GENRES, payload: genres })
   }
}