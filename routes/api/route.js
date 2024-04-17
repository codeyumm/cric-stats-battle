const express = require("express");
const apis = require('../../src/api/cricStats')

let router = express.Router();

router.route("/players").get(async (request, response) => {
    let limit = request.query.limit;
    let players = await apis.getAllPlayers(limit);
    let playersJSON = JSON.stringify(players);
    response.status(200).send(playersJSON);
});

router.route('/search').get(async (request, response) => {
    let userQuery = request.query.searchQuery;
    let playerList = await apis.getPlayer(userQuery);
    let playerListJSON = JSON.stringify(playerList);
    response.status(200).send(playerListJSON);
});

router.route('/stats/batting').get(async (request, response) => {
    let playerID = request.query.playerID;
    let battingStatsODI = await apis.getBattingStatsODI(playerID);
    
    if (battingStatsODI.length !== 0) {
        let statsJSON = JSON.stringify(battingStatsODI[0]);
        response.status(200).send(statsJSON);
    } else {
        response.status(404).send("Batting stats not found for this player ID.");
    }
});

router.route('/stats/bowling').get(async (request, response) => {
    let playerID = request.query.playerID;
    let bowlingStatsODI = await apis.getBowlingStatsODI(playerID);

    if (bowlingStatsODI.length !== 0) {
        let statsJSON = JSON.stringify(bowlingStatsODI[0]);
        response.status(200).send(statsJSON);
    } else {
        response.status(404).send("Bowling stats not found for this player ID.");
    }
});

module.exports = router;
