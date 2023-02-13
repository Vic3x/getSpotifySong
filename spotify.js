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


let currentSong = '';

const checkForUpdates = () => {
    request(options)
        .then(function (response) {
            if (response.is_playing && response.item.name !== currentSong) {
                currentSong = response.item.name;
                console.log(`Current song changed to: ${currentSong}`);
                location.reload();
            }
        })
        .catch(function (err) {
            console.error(err);
        });
};

const server = http.createServer((req, res) => {
    request(options)
        .then(function (response) {
            if (response.is_playing) {
                currentSong = response.item.name;
                res.end(`Current song: ${currentSong}`);
            } else {
                res.end('Nothing is playing');
            }
        })
        .catch(function (err) {
            console.error(err);
            res.end('An error occurred');
        });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
    setInterval(checkForUpdates, 5000);
});

