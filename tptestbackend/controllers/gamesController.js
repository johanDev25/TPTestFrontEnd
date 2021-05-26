const axios = require('axios')
const Games = require("../models/Games");

const obtenerJuegos = async (req, res) => {
    try {
      const configG = {
        method: "get",
        url: "https://api.twitch.tv/kraken/games/top?limit=100",
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": "ipr0s8ffa2060dteav87rwzc9jopm7",
        },
      };

      await axios(configG)
      .then(async function (response) {
        res.json(response.data.top);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
    }
  }

  const getGames = async (req, res = response) => {
    const games = await Games.find().populate("usuarios", "username");
  
    res.json({
      ok: true,
      games,
    });
  };

  const addFavorite = async (req, res = response) => {
    const game = new Games(req.body);
  
    try {
      game.user = req.uid;
  
      const eventoGuardado = await game.save();
  
      res.json({
        ok: true,
        evento: eventoGuardado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  };

  const eliminarFavoritos = async (req, res = response) => {
    const gameId = req.params.id;
    const uid = req.uid;
  
    try {
      const game = await Games.findById(gameId);
  
      if (!game) {
        return res.status(404).json({
          ok: false,
          msg: "Evento no existe por ese id",
        });
      }
  
      if (game.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene privilegio de eliminar este evento",
        });
      }
  
      await Games.findByIdAndDelete(gameId);
  
      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  };

  module.exports = {
    obtenerJuegos,
    getGames,
    addFavorite,
    eliminarFavoritos,
  };
 

  