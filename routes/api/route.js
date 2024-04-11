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

// api to find player
// /api/search/userInput

router.route('/search').get( async(request, response) => {

     let userQuery = request.query.searchQuery;

     console.log(userQuery);
    let playerList = await apis.getPlayer(userQuery);

    // convert object to json and send as repsonse
    let playerListJSON = JSON.stringify(playerList);

    response.status(200).send(playerListJSON);
});


module.exports = router;