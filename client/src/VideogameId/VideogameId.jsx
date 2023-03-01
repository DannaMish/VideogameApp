import NavBar from "../Componets/NavBar";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState  } from 'react';
import VideogameDetail from "../Componets/VideogameDetail";
import style from "./VideogameId.module.css";

export default function VideogameId(){
 
    const {id} = useParams();
    const [videogame, setVideogame] = useState({})
    console.log(id)
    
    useEffect( () => {
        fetch(`http://localhost:3001/videogames/${id}`)
        .then((response) => {return response.json() } )
        .then((videogame) => {
               setVideogame(videogame) 
            
        } )
        .catch((err)=>{ window.alert("No hay pesonaje con ese ID");
    });
    return setVideogame({});
    
    }, [id] );
    // videogame es nuestro estado, y al definirlo podemos asignarle un valor inicial
    // Validar si nuestro estado (videogames) ya tiene los valores obtenidos desde el backend
    // ...O seguira aun teniendo su valor inicial?

    if (videogame === {}){
        return <div>Espere un momento por favor</div>
    }
    else {
        console.log(videogame)


    
        return(
            <div className={style.container}>
                <NavBar/>
                   <Link to="/home"><button>Home</button></Link>
                    <VideogameDetail
                    
                        name={videogame.name}
                        description={videogame.description}
                        rating={videogame.rating}
                        image={videogame.image}
                        releasedAt={videogame.releasedAt}
                        platforms={videogame.platforms}
                        genres={videogame.genres} />

                
            </div>
        )
    }
            
}