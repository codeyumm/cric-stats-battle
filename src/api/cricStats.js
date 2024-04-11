// get monogdb and connectio file
const connection = require('../../src/database/db')
const { MongoClient } = require("mongodb");

// Functions for different API's

// function to get all the players
async function getAllPlayers(){
    
    // connect to database
    let db = await connection();

    // find all players from players collection
    let result = await db.collection('players').find( {} );

    // convert db response to array and store it
    let response = await result.toArray();

    
    return response;
}


module.exports = {
    getAllPlayers
}


