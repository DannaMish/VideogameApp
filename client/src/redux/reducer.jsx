
import { GET_VIDEOGAMES, SET_CURRENTPAGE, GET_VIDEOGAMES_BY_NAME, 
        FILTER_VIDEOGAMES_BY_GENRE, SORT_VIDEOGAMES_BY_NAME,
        GET_GENRES } from "./actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    currentPage: 1,
    genres: []
}


const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return { ...state,  videogames: action.payload, allVideogames: action.payload};
        case SET_CURRENTPAGE:
            return { ...state, currentPage: action.payload};
        case GET_VIDEOGAMES_BY_NAME:
            return { ...state, videogames: action.payload, currentPage: 1};
        case FILTER_VIDEOGAMES_BY_GENRE:

        
        //const tngCharacters = characters.filter(character => {
        //    return character.series.includes('Star Trek: The Next Generation');
        //});

            //"genres":[{"id":4,"name":"Action"},{"id":83,"name":"Platformer"}]}
            //"genres":[{"id":4,"name":"Action"},{"id":83,"name":"Platformer"}]}
            const filtered = action.payload === 'All'? state.allVideogames : state.allVideogames.filter(videogame => {
                return videogame.genres.map(genre => genre.name).includes(action.payload)
            } )
            return { ...state, videogames: filtered}
        case SORT_VIDEOGAMES_BY_NAME:
            console.log(action.payload)
            const sorted =  action.payload === 'asc' ?
            state.videogames.sort(function (videogame1, videogame2) {
                if (videogame1.name > videogame2.name) {
                    return 1;
                }
                if (videogame1.name < videogame2.name) {
                    return -1;
                }
                else {
                    return 0;
                }

            })
            : 
            state.videogames.sort(function (videogame1, videogame2) {
                if (videogame1.name > videogame2.name) {
                    return -1;
                }
                if (videogame1.name < videogame2.name) {
                    return 1;
                }
                else {
                    return 0;
                }

            })
            console.log(sorted[0].name)

            return { ...state, videogames: sorted}
        case GET_GENRES:
            return { ...state, genres: action.payload }
        default:
            return { ...state };
    }
}


export default rootReducer;