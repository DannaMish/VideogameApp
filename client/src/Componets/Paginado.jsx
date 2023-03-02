import React from "react";
import style from "./Paginado.module.css";
import { setCurrentPage } from "../redux/actions"
import { useDispatch, useSelector } from 'react-redux'

export default function Paginado({videogamePerPage}){
    
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    
    const handleClick = (page) => {
        dispatch(setCurrentPage(page))
      };

    const pageNumbers = []

    for( let i =0; i<Math.ceil(videogames.length/videogamePerPage); i++){
        pageNumbers.push(i+1)
    }
    
    return(
        <nav className={style.nav}>
            <ul className={style.ul}>
                {pageNumbers && pageNumbers.map(number =>(
                    <li onClick={() => handleClick(number)} className={style.lineal} key={number}>
                        <div>{number}</div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
