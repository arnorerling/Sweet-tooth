const offers = require('../data/data').offers;
const candies = require('../data/data').candies;
const pinatas = require('../data/data').pinatas;
const fs = require('fs');
const request = require('request');


const getAllCandies = () => {
    return candies;
}
const createCandy = (newCandy) => {
    candies.push(newCandy);
    return newCandy;
}
const getCandyById = (id) => {
    return candies.filter(i => i.id == id)[0];
}
const getAllOffers = () => {
    const offersRet = JSON.parse(JSON.stringify(offers));
    offersRet.forEach(offer => {
        var i;
        for(i = 0; i < offer.candies.length; i++){
            offer.candies[i] = getCandyById(offer.candies[i])
        }        
    });
    return offersRet;
}
const getAllPinatas = () => {
    const pinataRet = JSON.parse(JSON.stringify(pinatas));
    pinataRet.forEach(pinata => {
        if(pinata.currentHits === undefined){ pinata.currentHits = 0}
        delete pinata.surprise;
    })
    return pinataRet;
}
const getPinataById = (id) => {
    const allPinataCopy = getAllPinatas();
    var pinata = allPinataCopy.filter(p => p.id == id)[0];
    return pinata;
}
const getChangeablePinata = (id) => {
     return pinatas.filter(p => p.id == id)[0];
}
const createPinata = (newPinata) => {
    pinatas.push(newPinata);
    return newPinata;
}
const isPic = (url) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
const writeToTxt = (surprise) => {
    fs.appendFile("./surprise.txt", surprise + "\r\n", (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}
const dlPic = (surprise) => {
    const stringSplit = surprise.split('.');
    const ending = stringSplit[stringSplit.length-1]
    const mynd = fs.createWriteStream('./images/pinata.' + ending)
    request.get(surprise).pipe(mynd);
    
}
const hitPintata = (pinataId) => {
    var pinataToHit = getChangeablePinata(pinataId);
    if(pinataToHit.currentHits == undefined){ pinataToHit.currentHits = 0}
    
    if(pinataToHit.maximumHits === pinataToHit.currentHits){
        return '423 Locked'
    }
    else if(pinataToHit.maximumHits == pinataToHit.currentHits + 1){
        pinataToHit.currentHits += 1;
        
        if(isPic(pinataToHit.surprise)){ 
            dlPic(pinataToHit.surprise)
        }
        else{
            writeToTxt(pinataToHit.surprise)
        }
        return pinataToHit.surprise;
    }
    pinataToHit.currentHits += 1;
    return '204 No Content';
    
}
module.exports = {
    getAllCandies,
    getCandyById,
    createCandy,
    getAllOffers,
    getAllPinatas,
    getPinataById,
    createPinata,
    hitPintata
}