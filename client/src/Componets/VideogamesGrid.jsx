import React from 'react';
import VideogameCard from './VideogameCard';
import style from "./VideogameGrid.module.css"

import { useSelector } from 'react-redux';

export default function VideogamesGrid(){
    
    const videogames = useSelector(state => state.videogames);
    console.log('videogames')
    console.log(videogames)
    
    if (videogames.length === 0){
        return <div>No hay datos</div>
    }
    else {
        console.log(videogames)
        
        /*
        let videogames = []
        for( let i = 0; i < state.length; i++){
            const videogame = {
                id:state[i].id,
                name:state[i].name,
                rating:state[i].rating
            }
            videogames.push(videogame)           
        } 
        console.log(videogames)
        */

        /*
        statue:  [ { id: 157, name:, description,  image: , rating: ,} , { id: 215, name:, description,  image: , rating: ,}, { id: 58, name:, description,  image: , rating: ,}]
        videogames: []
        -------------------------------------------------------- for
        -------------- i = 0
        videogame: {id: 157, name:, rating: }
        videogames: [{id: 157, name:, rating: }]
        -------------- i = 1
        videogame:  { id: 215, name:,  rating: }
        videogames: [{id: 157, name:, rating: }, { id: 215, name:,  rating: }]
        -------------- i = 2
        videogame:  { id: 58, name:,  rating: }
        videogames: [{id: 157, name:, rating: }, { id: 215, name:,  rating: },  { id: 58, name:,  rating: }]
        -------------- i = 3
        -------------------------------------------------------- end for
        videogame: undefined
        console.log(videogames) -> [{id: 157, name:, rating: }, { id: 215, name:,  rating: },  { id: 58, name:,  rating: }]

        statte:
        [ { id: 157, name:, description,  image: , rating: ,} , { id: 215, name:, description,  image: , rating: ,}, { id: 58, name:, description,  image: , rating: ,}]
        =>
        videogames:
        [ {id: 157, nombre:, puntaje: },                           { id: 215, nombre:,  puntaje: },                      { id: 58, nombre:,  puntaje: }                         ]




        [<Videogame id=157 />>                                  <Videogame id=215 />,                                <Videogame id=58 />                       ]
        */

        // const videogames = state.map( videogame =>  ( { id: videogame.id, name: videogame.name, rating:videogame.rating} )     )
        // console.log(videogames)

        return (
            <ul className={style.container}>
                {videogames.map((videogame)=> 
                
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