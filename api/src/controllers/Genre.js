const { Genre } = require('../db')
const axios = require("axios");
const {
  API_KEY,
} = process.env;

exports.getGenres = async (req, res) => {
  try {
    const genresCount = await Genre.count();

    console.log('genresCount:', genresCount)
    
    let genres;

    if (genresCount === 0) {
      
      // Obtendremos los Genres desde la API externa 
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        genres = genresApi.data.results.map((genre) => ({ name: genre.name }) );
      
      
    

      // y lo guardamos en la base de datos
        await Genre.bulkCreate(genres);

      // const genres = genresApi.data.results.map( genres  => genres.name);

      // for (let i = 0; i < genres.length; i++) {
      //   const genre = { name: genres[i]}
      //   await Genre.create(genre)
      //   console.log('genre ' + genre + ' created successfully')
      // }

      // genres.forEach(async element => {
      //   const genre = { name: element };
      //    await Genre.create(genre);
        
      //   }
      // )
      
    }
    else {
      // Devolvemos los Genres al cliente desde la base de datos
        genres = await  Genre.findAll({
          attributes: ['id','name']
        })
      
    }
    
    res.json(genres)
  }
  catch(error) {
    res.status( error.response? error.response.status: 400 ).json(error.response? error.response.data : {error: "An unexpeced error ocurred!"})
  }

  
  

}