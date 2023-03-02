import React from 'react';
import VideogameCard from './VideogameCard';
import style from "./VideogameGrid.module.css"
import { useEffect, useState } from "react"

import { useSelector } from 'react-redux';

export default function VideogamesGrid(){
    
    const videogames = useSelector(state => state.videogames);
    const currentPage = useSelector(state => state.currentPage)
    const [currentGames, setcurrentGames] = useState([]);

    useEffect(() => {
        console.log('useEffect')
        const indexOfLasVideogame = currentPage * 15
        const indexOfFirstVideogame = indexOfLasVideogame - 15
        if (videogames.length> 0) {
            console.log('HERE')
            console.log(videogames[0].name)
        }
        setcurrentGames(videogames.slice(indexOfFirstVideogame,indexOfLasVideogame))
    }, [currentPage, videogames]);
    
    if (videogames.length === 0){
        return <div>No hay datos</div>
    }
    else {
        console.log(videogames.length)
        

        return (
            <ul className={style.container}>
                {currentGames.map((videogame)=> 
                
                    <li key={videogame.id}>

                        <VideogameCard 
                            id={videogame.id}
                            name={videogame.name}
                            rating={videogame.rating}
                            image={videogame.image}
                            genres={videogame.genres}
                        />

                    </li>
                )}
            </ul>
        )
    }
    
    }