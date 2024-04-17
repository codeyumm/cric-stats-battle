// get monogdb and connectio file
const connection = require('../../src/database/db')
const { MongoClient } = require("mongodb");

// Functions for different API's

// function to get all the players
async function getAllPlayers(limit){

    
    // connect to database
    let db = await connection();

    // find top 50 players from players collection
    let result = await db.collection('players').find( {} ).limit(parseInt(limit));

    // convert db response to array and store it
    let response = await result.toArray();

    
    return response;
}

// function to search player
async function getPlayer( userInput ){

    // connect to database
    let db = await connection();

    // to search player by first or last name
    const query = { name: { $regex: new RegExp(userInput, "i") } };

    // find player based on userinput string
    let result = await db.collection('players').find(query).toArray();

    return result;

}

// function to get player stats
// api to find players state

async function getBattingStatsODI(playerId) {
    
        // Connect to the database
        let db = await connection();


        let result = await db.collection('odi_batsman').find( {Id: parseInt(playerId) }).toArray();


        return result;

}

// function to get player stats
// api to find players state

async function getBattingStatsT20(playerId) {
    
    // Connect to the database
    let db = await connection();

    let result = await db.collection('t20_batsman').find( {Id: parseInt(playerId)}).toArray();
    
     
    return result;

}


// function to get player stats
// api to find players state

async function getBowlingStatsODI(playerId) {
    
    // Connect to the database
    let db = await connection();


    let result = await db.collection('odi_bowler').find( {Id: parseInt(playerId) }).toArray();

    console.log(result);

    return result;

}

// function to get player stats
// api to find players state

async function getBowlingStatsT20(playerId) {

    // Connect to the database
    let db = await connection();

    let result = await db.collection('t20_bowler').find( {Id: parseInt(playerId)}).toArray();

    console.log(result);

    return result;

}




module.exports = {
    getAllPlayers,
    getPlayer,
    getBattingStatsODI,
    getBattingStatsT20,
    getBowlingStatsODI,
    getBowlingStatsT20
}


