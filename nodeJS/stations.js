const exp = require('express');
const lodash = require("lodash");
const app = exp();
const stationList = require('../JSON/stationInfo.json');
const fs = require('fs');
const PORT = 4000;

app.use(exp.urlencoded({extended: true}));
app.use(exp.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/stationList/:id', (req, res) => {
    const id = req.params.id;
    switch (id) {
        case "Americas": {
            res.status(200).json(stationList.data[0]);
            break;
        }
        case "Europe": {
            res.status(200).json(stationList.data[1]);
            break;
        }
        case "Kolkata": {
            res.status(200).json(stationList.data[2]);
            break;
        }
        case "Bengaluru": {
            res.status(200).json(stationList.data[4]);
            break;
        }
        case "KolkataUC": {
            res.status(200).json(stationList.data[3]);
            break;
        }
        case "BengaluruUC": {
            res.status(200).json(stationList.data[5]);
            break;
        }
        case "AmericasFeeder": {
            res.status(200).json(stationList.data[6]);
            break;
        }
        case "EuropeFeeder": {
            res.status(200).json(stationList.data[7]);
            break;
        }
        default: {
            res.status(400).json({ error: "Missing or wrong argument" });
            break;
        }
    }
},
    err => {
        res.status(401).json({ error: err })
    })

app.get('/stationInfo/:loc/:id', (req, res)=> {
    const id = req.params.id;
    const loc = req.params.loc;
    let response = [];
    let item = [];
    switch(loc) {
        case "Americas": {
            item = stationList.data[0];
            break;
        }
        case "Europe": {
            item = stationList.data[1];
            break;
        }
        case "Kolkata": {
            item = stationList.data[2];
            break;
        }
        case "Bengaluru": {
            item = stationList.data[4];
            break;
        }
        default: {
            res.status(400).json({ error: "Missing or wrong argument" });
        }
    }
    for (let val of item.line) {
        if (Object.keys(val).includes(id)) {
            response.push(val);
        }
    }
    
    res.status(200).json({data: response});
})

app.get('/allStations/:id' , (req, res)=> {
    const id = req.params.id;
    let line = [];
    let stationsList = [];
    let finalList = [];
    switch(id) {
        case "Americas": {
            line = stationList.data[0];
            break;
        }
        case "Europe": {
            line = stationList.data[1];
            break;
        }
        case "Kolkata": {
            line = stationList.data[2];
            break;
        }
        case "Bengaluru": {
            line = stationList.data[4];
            break;
        }
        default: {
            res.status(400).json({ error: "Missing or wrong argument" });
        }
    }
    for (let val of line.line) {
        stationsList.push(Object.keys(val));
    }
    for (let item of stationsList) {
        for (let val of item) {
          if (!finalList.includes(val) && val !== 'colorCode') {
            finalList.push(val);
          }
        }
      }
    res.status(200).json({data: finalList});
})

app.listen(PORT);