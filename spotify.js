const request = require('request-promise');
const dotenv = require('dotenv');
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

request(options)
    .then(function (response) {
        if (response.actions.is_playing == true) {
            console.log('Name: ' + response.item.name + '\nAlbum: ' + response.item.album.name);
        } else {
            console.log('Nothing is playing');
        }
    })
    .catch(function (err) {
        console.error(err);
    });
