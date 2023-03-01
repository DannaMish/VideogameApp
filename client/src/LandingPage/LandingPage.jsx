import style from "../LandingPage/Landing.module.css"
import { Link } from "react-router-dom"

export default function Landing (){
    return (
        <div className={style.fullfondo}>
            <h2 className={style.text}>Bienvenido al Videogame de Danna</h2>
           <Link to="/home"><button className={style.button}>Ingresa al Home</button></Link> 
        </div>
    )
}
