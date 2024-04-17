const express = require("express");

const apis = require('../../src/api/cricStats')

// create router object
let router = express.Router();

// /api/players
router.route("/players").get( async(request, response) => {

    // for api to get all players
    // /api/players -> retuns all players data json

    let limit = request.query.limit;


    let players = await apis.getAllPlayers(limit);
        
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

    // api to find players state
    router.route('/stats/batting').get( async(request, response) => {

    
        let playerID = request.query.playerID;
        
        let battingStatsODI = await apis.getBattingStatsODI(playerID);

        let battingStatsT20 = await apis.getBattingStatsT20(playerID);

        

        if( battingStatsODI.length != 0 && battingStatsT20.length != 0){
            let stats = getSumOfBattingStats(battingStatsODI, battingStatsT20);
        
            let statsJSON = JSON.stringify(stats);
            
            console.log("btoh");
            response.status(200).send(statsJSON);
        }

        if( battingStatsT20.length == 0){
            console.log("t20");

            response.status(200).send(JSON.stringify(battingStatsODI))
        }


        if( battingStatsODI.length == 0){
            console.log("odi");

            response.status(200).send(JSON.stringify(battingStatsT20))
        }




    });


router.route('/stats/bowling').get(async (request, response) => {
    
        let playerID = request.query.playerID;

        
        let bowlingStatsODI = await apis.getBowlingStatsODI(playerID);
        let bowlingStatsT20 = await apis.getBowlingStatsT20(playerID);

        if (bowlingStatsODI.length !== 0 && bowlingStatsT20.length !== 0) {
          
            let stats = getSumOfBowlingStats(bowlingStatsODI, bowlingStatsT20);
            let statsJSON = JSON.stringify(stats);

            response.status(200).send(statsJSON);

        } else if (bowlingStatsT20.length === 0) {
            
            console.log("T20 data not found");
            response.status(200).send(JSON.stringify(bowlingStatsODI));

        } else if (bowlingStatsODI.length === 0) {
           
            console.log("ODI data not found");
            response.status(200).send(JSON.stringify(bowlingStatsT20));
        }
});



   
    function getSumOfBattingStats(battingStatsODI, battingStatsT20) {
        if (battingStatsODI.length !== 0 && battingStatsT20.length !== 0) {
            const odiStats = battingStatsODI[0];
            const t20Stats = battingStatsT20[0];
    
            const combinedStats = {
                Id: odiStats.Id,
                playerName: odiStats.playerName,
                span: `${odiStats.span} / ${t20Stats.span}`,
                matches: odiStats.matches + t20Stats.matches,
                innings: odiStats.innings + t20Stats.innings,
                runs: odiStats.runs + t20Stats.runs,
                average: (odiStats.average + t20Stats.average) / 2,
                hundred: odiStats.hundred + t20Stats.hundred,
                fifty: odiStats.fifty + t20Stats.fifty
            };
    
            return combinedStats;
        } else {
            return null;
        }
    }


    function getSumOfBowlingStats(bowlingStatsODI, bowlingStatsT20) {
        
        const odiStats = bowlingStatsODI[0];
        const t20Stats = bowlingStatsT20[0];
    
        
        const combinedStats = {
            Id: odiStats.Id,
            playerName: odiStats.playerName,
            span: `${odiStats.span} / ${t20Stats.span}`,
            matches: odiStats.matches + t20Stats.matches,
            innings: odiStats.innings + t20Stats.innings,
            overs: odiStats.overs + t20Stats.overs,
            Mdns: odiStats.Mdns + t20Stats.Mdns,
            runs: odiStats.runs + t20Stats.runs,
            wickets: parseInt(odiStats.wickets) + parseInt(t20Stats.wickets), 
            bestBowlinFiguer: odiStats.bestBowlinFiguer + ' / ' + t20Stats.bestBowlinFiguer,
            avg: (odiStats.avg + t20Stats.avg) / 2,
            economy: (odiStats.economy + t20Stats.economy) / 2, 
            strikeRate: (odiStats.strikeRate + t20Stats.strikeRate) / 2, 
            fours: odiStats.fours + t20Stats.fours,
            sixes: odiStats.sixes + t20Stats.sixes
        };
    
        return combinedStats;
    }
    
    


module.exports = router;