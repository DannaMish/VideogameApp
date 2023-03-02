import { useState } from 'react'
import style from "./SearchBar.module.css";
import { getVideogamesByName, filterVideogamesByGenre, sortVideogamesByName } from "../redux/actions"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function SearchBar(){

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideogamesByName(search));
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    function handleChangeGenre(e) {
        console.log(e.target.value)
        dispatch(filterVideogamesByGenre(e.target.value))
    }

    function handleChangeOrderByName(e) {
        dispatch(sortVideogamesByName(e.target.value))
    }


    return(
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <input className={style.input} type="text" onChange={handleChange} ></input>
                <button type="submit">Buscar</button>
             </form>

             <div className={style.asc}>
             <select onChange={handleChangeOrderByName}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
             </select>
             <select onChange={handleChangeGenre}>
                <option value="All">All genres</option>
                {
                    genres.map(genre => (
                        <option value={genre.name}>{genre.name} </option>
                    ))
                }
            </select>
            
             </div>

         </div>
            )       
         }
    