const request = require('request-promise');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config();


const options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/player/currently-playing?market=ES',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': process.env.API_TOKEN
    },
    json: true
};


const server = http.createServer((req, res) => {



    request(options)
        .then(function (response) {
            if (response.is_playing) {
                res.end('Current song: ' + response.item.name);
            } else {
                res.end('Nothing is playing');
            }
        })
        .catch(function (err) {
            console.error(err);
            res.end('An error occured');
        });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

