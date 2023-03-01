import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"

export const getVideogames = () => {
     return async function (dispatch) {
        const videogamesAPI = await axios.get("http://localhost:3001/videogames");
        const videogames = videogamesAPI.data;
        console.log(videogames);
        dispatch( {type: GET_VIDEOGAMES, payload: videogames } );
     }
};
