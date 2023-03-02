import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

export default function NavBar (){
    return(
        <div className={style.mainContainer}>
          <Link to="/">Landing</Link>
          <Link to="/videogame/create">Crear Videogame</Link>
          <Link to="/videogame/:Id">VideogameId</Link>
        </div>
    )
}