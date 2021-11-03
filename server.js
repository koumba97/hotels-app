const express = require("express");
const app = express();
const axios = require('axios');
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));

const apiToken = 'sandb_iizLheGLJiVaJVEOMzXF97mutZTvh4V1Eb1LUxfq';


app.get('/hotels', async function (req, res) {
    try {
        await axios.get('http://hotel.leavy.voyage/v1/hotels',{
        headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiToken
        }}, req)
        .then(resp => {
            console.log(resp.data);
            res.send(resp.data);
        });
    } catch (error) {
        console.log(error.message);
       // res.send('fail');
    }
})

app.listen(4242, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log(`server listening on http://localhost:4242 🎉`);
    }
})