import style from "../LandingPage/Landing.module.css"
import { Link } from "react-router-dom"

export default function Landing (){
    return (
        <div className={style.fullfondo}>
           <Link to="/home"><button className={style.button}>Welcome to Videogame</button></Link> 
        </div>
    )
}
