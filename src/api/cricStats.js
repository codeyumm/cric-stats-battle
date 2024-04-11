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

// function to search player
async function getPlayer(userInput){

    // connect to database
    let db = await connection();

    // to search player by first or last name
    const query = { name: { $regex: new RegExp(userInput, "i") } };

    // find player based on userinput string
    let result = await db.collection('players').find(query).toArray();

    return result;

}

// function to get player stats


module.exports = {
    getAllPlayers,
    getPlayer
}


