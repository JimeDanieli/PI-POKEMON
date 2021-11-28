const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Types } = require('../db');



router.get('/', async (req, res, next) => {
        try {
                const dbTypes = await Types.findAll();
                if (!dbTypes.length) {
                        const apiTypes = (await axios.get("https://pokeapi.co/api/v2/type")).data.results;
                        const types = apiTypes.map(t => ({ name: t.name, img: `https://typedex.app/types/${t.name}.png`, }));
                        const dbtypesCreate = await Types.bulkCreate(types)
                        return res.send(dbtypesCreate)

                } else {
                        return res.status(201).json(dbTypes)
                }
        } catch (err) {
                next(err);
        }
});

module.exports = router;