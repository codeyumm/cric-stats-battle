const express = require("express");

const apis = require('../../src/api/cricStats')

// create router object
let router = express.Router();

// /api/players
router.route("/players").get( async(request, response) => {

    // for api to get all players
    // /api/players -> retuns all players data json


    let players = await apis.getAllPlayers();
        
    // convert object to json
    let playersJSON = JSON.stringify(players);

    response.status(200).send(playersJSON);

} );


module.exports = router;