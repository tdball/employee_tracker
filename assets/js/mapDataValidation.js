function validCoordinate(coordinateObject, delay) {
    // Make sure we have coordinates
    if (!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    // Make sure they are within a sane range
    } else if( coordinateObject.longitude > 180 ||
        coordinateObject.longitude < -180 &&
        coordinateObject.latitude > 90 ||
        coordinateObject.latitude < -90) {
        return false
    } else {
        fetch(`https://api.tdball.net/in-water/?latitude=${coordinateObject.latitude}&longitude=${coordinateObject.longitude}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data.water
            })
    }
}

function geocodeHandler(results, status) {
    // Not effective at the moment, may go down another path to solve this problem
    if (status === 'OK') {
        for (let result of results) {
            console.log(result)
            for (let type of result.types) {
                if (type === 'sea' || 'ocean' || 'lake') {
                    return false
                } else {
                    return true
                }
            }
        }
    } else if(status === 'OVER_QUERY_LIMIT') {
        console.log(status)
    } else {
        // TODO: add better error handling here
        console.log(status)
        return false
    }
}

