const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/data')
const services = require('./services/service')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/candies', function(req,res){
    var allCandies = services.getAll();
    res.status(200).json(allCandies);
});
app.post('/api/candies', function(req, res){
    var newCandy = services.createCandie(req.body);
    res.status(201).json(newCandy);
});
app.get('/api/candies/:id', function(req,res){
    const candieId = req.params.id;
    var candy = services.getCandyById(candieId)
    res.status(200).json(candy);
});
app.get('/api/offers', function(req, res){
    const offers = services.getAllOffers();
    res.status(200).json(offers);
});
app.get('/api/pinatas', function(req,res){
    const pinatas = services.getAllPinatas();
    res.status(200).json(pinatas);
});
app.get('/api/pinatas/:id', function(req,res){
    const pinataId = req.params.id;
    var pinata = services.getPinataById(pinataId)
    res.status(200).json(pinata);
});
app.post('/api/pinatas', function(req,res){
    const newPinata = services.createPinata(req.body);
    res.status(200).json(newPinata);
});
app.get('/api/pinatas/:id/hit', function(req,res){
    const pinataId = req.params.id;
    retVal = services.hitPintata(pinataId)
    if(retVal === '423 Locked'){ res.status(423).json(retVal)}
    else if(retVal === '204 No Content'){ res.status(204).json(retVal)}
    else {res.status(200).json(retVal)};

});
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
