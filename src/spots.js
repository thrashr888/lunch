
const spots = require('./spots.json').spots;

// console.log('spots', spots);

var getSpot = function (filters) {
    var chances = [];
    var count = 1;

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
            return spots[i];
        }
    }

}

export default getSpot;