const express = require("express");
const app = express();
const axios = require('axios');
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));

const apiToken = 'sandb_iizLheGLJiVaJVEOMzXF97mutZTvh4V1Eb1LUxfq';


app.get('/hotels/:country/:start?/:end?', async function (req, res) {
    let countryCode = req.params.country;
    let start = req.params.start;
    let end = req.params.end;

    if(start!==undefined && end!==undefined){
        await axios.get('http://hotel.leavy.voyage/v1/hotels?country[eq]='+countryCode+'&start='+start+'&end='+end,{
            headers: {
                'Content-Type': 'application/json', 
                'X-API-KEY': apiToken,
            },
        }, req)
        .then(resp => {
            //console.log(resp.data);
            res.send(resp.data);
        })
        .catch(function (error){
            //console.log(error.message);
            res.send(error);
        });
    }
    else{
        await axios.get('http://hotel.leavy.voyage/v1/hotels?country[eq]='+countryCode,{
            headers: {
                'Content-Type': 'application/json', 
                'X-API-KEY': apiToken,
            },
        }, req)
        .then(resp => {
            //console.log(resp.data);
            res.send(resp.data);
        })
        .catch(function (error){
            //console.log(error.message);
            res.send(error);
        });
    }


})


app.get('/hotel/:id/', async function (req, res) {
    let hotelId = req.params.id;
   
    await axios.get('http://hotel.leavy.voyage/v1/hotels/'+hotelId,{
        headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiToken,
        },
    }, req)
    .then(resp => {
        console.log(resp.data);
        res.send(resp.data);
    })
    .catch(function (error){
        console.log(error.message);
        res.send(error);
    });

})

app.get('/hotels/test', async function (req, res) {
    let countryCode = "ESP";
    let start = "2021-12-31";
    let end = "2022-01-10";
    await axios.get('http://hotel.leavy.voyage/v1/hotels?country[eq]='+countryCode+'&start='+start+'&end='+end,{
        headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiToken,
        },
    }, req)
    .then(resp => {
        console.log(resp.data);
        res.send(resp.data);
    })
    .catch(function (error){
        console.log(error.message);
        res.send(error);
    });

})

app.listen(4242, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log(`server listening on http://localhost:4242 🎉`);
    }
})