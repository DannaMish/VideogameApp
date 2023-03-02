import VideogamesGrid from "../Componets/VideogamesGrid"
import NavBar from "../Componets/NavBar"
import SearchBar from "../Componets/SearchBar"
import { getVideogames, getGenres } from "../redux/actions"
import React from "react";
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import Paginado from "../Componets/Paginado";

export default function Home (){

const videogamePerPage = 15;

    console.log("Renderizando HOME")

    const dispatchVideogame = useDispatch();
    useEffect(() => {
      dispatchVideogame(getVideogames())
    }, [dispatchVideogame]);

    const dispatchGenre = useDispatch();
    useEffect(() => {
      dispatchGenre(getGenres())
    })



    return (
        <div>
          <NavBar/>
          <SearchBar/>
          <Paginado 
          videogamePerPage={videogamePerPage}
          />
          <VideogamesGrid/>
        </div>
    )
}
