import { useState, useEffect } from 'react'

export default function SearchBar(){

    const [search, setSearch] = useState('');


    const handleSubmit = async () => {
        await fetch(`http://localhost:3001/videogames?name=${search}`)
        .then((response) => {return response.json() } )
        .then((responseJSON) => {
        } )
        
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} ></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}