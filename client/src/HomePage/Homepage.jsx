import VideogamesGrid from "../Componets/VideogamesGrid"
import NavBar from "../Componets/NavBar"
import SearchBar from "../Componets/SearchBar"
import { getVideogames } from "../redux/actions"

import { useEffect } from "react"
import { useDispatch } from 'react-redux'

export default function Home (){
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getVideogames())
    }, [dispatch]);

    return (
        <div>
          <NavBar/>
          <SearchBar/>
          <VideogamesGrid/>
        </div>
    )
}
