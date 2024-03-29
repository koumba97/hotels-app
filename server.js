const express = require("express");
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = '4242';
app.use(cors({origin: true, credentials: true}));

const apiToken = 'sandb_iizLheGLJiVaJVEOMzXF97mutZTvh4V1Eb1LUxfq';


app.get('/hotels/:size/:country/:start?/:end?', async function (req, res) {
    let countryCode = req.params.country;
    let start = req.params.start;
    let end = req.params.end;
    let size = req.params.size;

    if(start!==undefined && end!==undefined){
        axios.get('http://hotel.leavy.voyage/v1/hotels?size='+size+'&country[eq]='+countryCode+'&start='+start+'&end='+end,{
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
        axios.get('http://hotel.leavy.voyage/v1/hotels?size='+size+'&country[eq]='+countryCode,{
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
   
    axios.get('http://hotel.leavy.voyage/v1/hotels/'+hotelId,{
        headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiToken,
        },
    }, req)
    .then(resp => {
        res.send(resp.data);
    })
    .catch(function (error){
        res.send(error);
    });
})

app.get('/hotels/test', async function (req, res) {
    let countryCode = "ESP";
    let start = "2021-12-31";
    let end = "2022-01-10";
    axios.get('http://hotel.leavy.voyage/v1/hotels?country[eq]='+countryCode+'&start='+start+'&end='+end,{
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

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log(`server listening on http://localhost:${port} 🎉`);
    }
})