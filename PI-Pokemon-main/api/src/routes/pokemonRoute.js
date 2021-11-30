const express = require('express');
const axios =require('axios');
const router= express.Router();
const {v4: uuidv4} =require('uuid');
const { Pokemons, Types } = require('../db');
const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {

    try {
        let { name } = req.query
        let pokemonsTotal = []
        let finalArr = []

        if (name) {
            let dbPoke = await Pokemons.findAll({//con findAll me traigo la info de la base de datos
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` //to find aything that's kinda related. it doesn't need to be exact
                    }
                },
                include:{
                    model: Types,//lo incluye para que tome la relacion despues
                }
            });
            try {
                let apiPoke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
                let pokemon = {
                    id: apiPoke.id,
                    name: apiPoke.name,
                    healthPoints: apiPoke.stats[0].base_stat,
                    attack: apiPoke.stats[1].base_stat,
                    defense: apiPoke.stats[2].base_stat,
                    speed: apiPoke.stats[5].base_stat,
                    height: apiPoke.height,
                    weight: apiPoke.weight,
                    img: apiPoke.sprites.other.dream_world.front_default,
                    types: apiPoke.types.map((t) => ({
                        name: t.type.name,
                        img: `https://typedex.app/types/${t.type.name}.png`,
                    })),
                }
                finalArr.push(pokemon);
                
            } catch (err) {
                return res.status(201).json([...dbPoke]);
            }
            pokemonsTotal = dbPoke.concat(finalArr)
        }
        else {
            let dbPoke = await Pokemons.findAll({ include: [Types] });
            let apiPoke = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results;

            let arrayFor = []
            for (i = 0; i < apiPoke.length; i++) {
                arrayFor.push(axios.get(apiPoke[i].url))

            }
            let poke = await Promise.all(arrayFor)//lo usamos como placeholder
            for (let i = 0; i < apiPoke.length; i++) {
                let pokeI = poke[i].data;
                let pokemon = {
                    id: pokeI.id,
                    name: pokeI.name,
                    healthPoints: pokeI.stats[0].base_stat,
                    attack: pokeI.stats[1].base_stat,
                    defense: pokeI.stats[2].base_stat,
                    speed: pokeI.stats[5].base_stat,
                    height: pokeI.height,
                    weight: pokeI.weight,
                    img: pokeI.sprites.other.dream_world.front_default,//Buscar de donde sale
                    types: pokeI.types.map((t) => ({
                        name: t.type.name,
                        img: `https://typedex.app/types/${t.type.name}.png`,
                    })),
                }
                arrayFinal.push(pokemon);
            }
            pokemonsTotal = dbPoke.concat(arrayFinal)
        }
        return res.status(201).json(pokemonsTotal);
    } catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        if (id.length > 2) {
            let dbPoke = await Pokemons.findOne({
                where: {
                    id,
                },
                include: {
                    model: Types
                },
            });
            return res.status(200).json(dbPoke)
        }
        else {
            var num = parseInt(id)
            let idPoke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`)).data;
            let pokemons = {
                id: idPoke.id,
                name: idPoke.name,
                healthPoints: idPoke.stats[0].base_stat,
                attack: idPoke.stats[1].base_stat,
                defense: idPoke.stats[2].base_stat,
                speed: idPoke.stats[5].base_stat,
                height: idPoke.height,
                weight: idPoke.weight,
                img: idPoke.sprites.other.dream_world.front_default,
                types: idPoke.types.map((t) => ({
                    name: t.type.name,
                    img: `https://typedex.app/types/${t.type.name}.png`,
                })),
            };
            return res.status(200).json(pokemons)
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let { name, healthPoints, attack, defense, speed, height, weight, img, createdInBd, types } = req.body;

        let newPoke = await Pokemons.create({
            id: uuidv4(),
            name,
            healthPoints,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            createdInBd,
        });
        await newPoke.addTypes(types)
        return res.status(200).json(newPoke)
    } catch (err) {
        next(err);
    }
});

module.exports = router;