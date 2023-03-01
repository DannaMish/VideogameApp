import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

export default function NavBar (){
    return(
        <div className={style.mainContainer}>
          <Link to="/">Home</Link>
          <Link to="/Videogames">Videogame</Link>
          <Link to="/videogames/:Id">VideogameId</Link>
        </div>
    )
}