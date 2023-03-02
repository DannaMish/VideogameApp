import style from "./VideogameDetail.module.css";
import parser from "html-react-parser";

export default function VideogameDetail(props){
    console.log(props.genres)
    console.log('platforms')
    console.log(props.platforms)
    return(
        <div className={style.container}>
            <h2 className={style.title}>{props.name}</h2>
            <p className={style.parrafo}>{ props.description }</p>
            <p className={style.parrafo}>{props.rating}</p>
            <img className={style.image} src={props.image} alt={props.name} />
            <p className={style.parrafo}>{props.releasedAt}</p>
            <div className={style.parrafo}>{props.platforms}</div>
            {props.genres?.map((genre)=>
            <div className={style.parrafo} key = {genre.id}>{genre.name}</div>
            )}
        </div>
    )
}
    