import style from "./VideogameCard.module.css"
import { Link } from "react-router-dom";

export default function VideogameCard(props){
    
    
    return(
        <div className={style.card} >
            <h2>
                <Link to={`/videogame/${props.id}`}>{props.name}</Link>
            </h2>
            <p className={style.parrafo}>{props.rating}</p>
            <img className={style.image} src={props.image} alt={props.name} width="300px" height="300px"/>
            {props.genres?.map((genre)=>
            <div className={style.vgenre} key = {genre.id}>{genre.name}</div>
            )}      
        </div>
    )
}
