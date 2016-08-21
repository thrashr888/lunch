
// const spots = require('./spots.json').spots;

// console.log('spots', spots);

import Tabletop from 'tabletop';


// https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1Pf17E3XT0GM-8QkO-K2mBh-45SYd96QsIF5nHKX1WhY&output=html
// https://docs.google.com/spreadsheets/d/1Pf17E3XT0GM-8QkO-K2mBh-45SYd96QsIF5nHKX1WhY/pubhtml

var getSpotsSheet = function (cb) {
    Tabletop.init({
        key: '1Pf17E3XT0GM-8QkO-K2mBh-45SYd96QsIF5nHKX1WhY',
        callback: cb,
        simpleSheet: true,
        parseNumbers: true,
        debug: true
    });
}

var SPOTS_CACHE = null;
var getSpots = function () {
    return new Promise(function (resolve, reject) {
        if (SPOTS_CACHE) {
            console.log('USING SPOTS_CACHE');
            resolve(SPOTS_CACHE);
            return;
        }
        getSpotsSheet(function (data, tabletop) {
            console.log('tabletop', data, tabletop);
            SPOTS_CACHE = data;
            return data ? resolve(data) : reject('no data found');
        });
    });
}

var getSpot = function (filters) {
    var chances = [];
    var count = 1;

    return new Promise(function (resolve, reject) {
        getSpots().then(function (spots) {
            for (let i in spots) {
                let spot = spots[i]
                spot.id = count;
                count++;
                // console.log('spot', spot);

                // Weighting based on rating
                for (let u = 0; u < spot.rating * 10; u++) {

                    // Filer by max distance
                    if (spot.distance <= filters.maxDistance &&
                        spot.time <= filters.maxTime) {
                        chances.push(spot.id);
                    }
                }
            }
            // console.log('chances', chances);

            var choice = chances[Math.floor(Math.random() * chances.length)];
            console.log("choice: ", choice);

            for (let i in spots) {
                if (spots[i].id === choice) {
                    console.log("chosen", spots[i]);
                    resolve(spots[i]);
                    return;
                }
            }
        }).catch(function (err) {
            console.error(err);
        });
    });

}

export default getSpot;