import { useSelector } from "react-redux";

export default function FormPage() {

    const genres = useSelector(state => state.genres);


    function handleSubmit(){

    }

    return (
        <form onSubmit={handleSubmit}>
            <div> 
                <label>Name:</label>
                <input type="text"></input>
            </div>
            <div> 
                <label>Image:</label>
                <input type="text"></input>
            </div>
            <div> 
                <label>Description:</label>
                <input type="text"></input>
            </div>            
            <div> 
                <label>Platforms:</label>
                <input type="text"></input>
            </div>            
            <div> 
                <label>Released at:</label>
                <input type="text"></input>
            </div>            
            <div> 
                <label>Genres:</label>
                <select>
                    {genres.map((genre) => (
                        <option value={genre.id}>{genre.name} </option>
                    )
                    )}
                </select>
            </div>
            <button type="submit" > Create Videogame</button>
        </form>
    )
}