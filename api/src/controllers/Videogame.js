const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const {
  API_KEY,
} = process.env;
const pass = null;
const max_result =10;
const { validate } = require("uuid")


//get


exports.getVideogames = async (req, res) => {

    const { name } = req.query;
  
    // try {
      const videogames = name? await getVideogamesByName(name) : await getAllVideogames();
      if  (videogames.length === 0){
        res.json({warning: "Could not find any videogame"})
      }
      else{
        res.json(videogames);
      }
    
  
    // }
    // catch(error) {
    //   res.status(500).send(error)
    // }
  }
  
  exports.getVideogameById = async (req, res) => {
  
    const { idVideogame } = req.params;
  
    try {
  
      if (validate(idVideogame)){
        const videogame = await getVideogameByIdDB(idVideogame);
        if (videogame){
          res.json(videogame);
          return;
        } else {
          res.status(404).json({ warning: `videogame with id: ${idVideogame} was not found`})
          return
        }
      }
      else{
        //search in the api
        const videogame = await getVideogameByIdAPI(idVideogame);
        //res.status(videogame.warning? 404 : 200).json(videogame);
        //res.send('Not found')
  
        if (videogame.warning){
          res.status(404).json(videogame);
        }
        else {
          res.status(200).json(videogame);
        }
        
      }
      
    }
    catch(error){
       res.status(500).json({error: error})
    }
  
    
  }
  
  // -- POST METHOD --
  
  exports.createVideogame = async (req, res) => {
  
    //try {
  
      const {name, description, platforms, image, releasedAt, rating, genreIds} = req.body;
  
      if (!name) {
        res.status(400).json( { error: 'name was expected but not provided'} )
        return
      }
      //name?  pass : res.status(400).json( { error: 'name was expected but not provided'} )
      description? pass : res.status(400).send('description was expected but not provided')
      rating? pass : res.status(400).send('rating was expected but not provided')
      genreIds? pass : res.status(400).send('genreId was expected but not provided') // Array de string (cada string es un id)
  
      const videogame = {
        name,
        description,
        platforms,
        image,
        releasedAt,
        rating,
      };
  
      
  
      const videogameCreated = await Videogame.create(videogame);
  
  
      // Mapeamos cada genreId del array genreIds a un objeto Genre traido de la base de datos
      const genres = await Promise.all(
        genreIds.map(async (genreId) => await Genre.findOne({
          where: {
            id: genreId
          }
        }))
      );
      await videogameCreated.addGenre(genres)
  
      res.json({ success: true})
    //}
     //catch(error) {
      // res.status(400).json({error: "An unexpected error ocurred!"})
     //}
    
  }
  
  
  const getAllVideogames= async  () => {
    const videogamesDB = await getAllVideogamesDB();
    const videogamesAPI = await getAllVideogamesAPI();
    const videogames = [ ...videogamesDB, ...videogamesAPI];
    return videogames
  }

  const getAllVideogamesDB = async () => {
    const videogames = await Videogame.findAll({
      attributes: ['id','name','image','rating'],
      include: {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      }
    });
    return videogames;
    
  }

  const getAllVideogamesAPI = async () => {
    const promise1 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=1`);
    const promise2 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=2`);
    const promise3 =  axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=3`);

    const videogamesApi = await Promise.all([promise1, promise2, promise3]).then( 
      (values) =>
     {
         return values[0].data.results
        .concat(values[1].data.results)
        .concat(values[2].data.results);
    });

    console.log(videogamesApi.length);
    return videogamesApi.map(
      (videogame) => ({
        id: videogame.id,
        name: videogame.name,
        rating: videogame.rating,
        image: videogame.background_image,
        genres: videogame.genres.map(
                                (genre) => ({
                                  id: genre.id,
                                  name: genre.name
                                  })
                              )
      }
      ))
  }

  
  const getVideogamesByName = async (name) => {
    const videogamesDB = await getVideogamesByNameDB(name);
    if (videogamesDB.length < max_result) {
      const videogamesAPI = await getVideogamesByNameAPI(name, max_result - videogamesDB.length);
      const videogames = [ ...videogamesDB, ...videogamesAPI];
      return videogames;
    }
    else {
      return videogamesDB;
    }
    
  }
  
  const getVideogamesByNameDB = async (name) => {
  
    const videogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      },
      attributes: ['id', 'name', 'image', 'rating'],
      limit : max_result,
      include: {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      }
    });
    return videogames;
  }
  
  const getVideogamesByNameAPI = async (name, max) => {
  
    const videogamesApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);   
    //console.log(videogamesApi);
    return videogamesApi.data.results.slice(0,max).map(
      (videogame) => ({
        id: videogame.id,
        name: videogame.name,
        rating: videogame.rating,
        image: videogame.background_image,
        genres: videogame.genres.map(
                                (genre) => ({
                                  id: genre.id,
                                  name: genre.name
                                  })
                              )
      }
      ))
  }
  
  
  async function getVideogameByIdDB(idVideogame) {
    const videogame = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      attributes: ['name','description', 'platforms', 'image', 'releasedAt', 'rating'],
      include: {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      }
    })
    return videogame
  }
  
  async function getVideogameByIdAPI(id) {
    try{
      const videogameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const videogame = videogameAPI.data;
      return {
          id: videogame.id,
          name: videogame.name,
          description: videogame.description,
          rating: videogame.rating,
          image: videogame.background_image,
          releasedAt: videogame.released,
          platforms: videogame.platforms.map(
            (platform) => (platform.platform.name)
          ).join(' - '),
          genres: videogame.genres.map(
            (genre) => ({
              id: genre.id,
              name: genre.name
              })
          )
        }
      }     
      catch {
        return { warning: `videogame with id: ${id} was not found`}
      }
      
  
    
  }
  
  
  exports.test = async (req, res) => {
  
    const videogame = await Videogame.findOne({
      where: {
        id: '6aa4fcd5-7b1e-4e20-9e9d-94b03253cefb'
      },
      attributes: ['id', 'name', 'description', 'rating'],
      include: {
        model: Genre,
        attributes: ['id','name'],
        through: {
          attributes: [],
        }
      }
    });
    const genre = await Genre.findOne({
      where: {
        id: 'be071d93-62a2-4ed8-a93a-bf93f3de9acb'
      }}
    );
  
    await videogame.addGenre(genre);
  
  
  
    res.json(videogame);
  }
