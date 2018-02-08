function validCoordinate(coordinateObject) {
    // Make sure we have coordinates
    if (!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    }
    // Make sure they are within a sane range
    switch(coordinateObject) {
        case coordinateObject.latitude > 90:
            console.log('case')
            return false
        case coordinateObject.latitude < -90:
            console.log('case')
            return false
        case coordinateObject.longitude > 180:
            console.log('case')
            return false
        case coordinateObject.longitude < -180:
            console.log('case')
            return false
        // If they are, verify them against the API
        default:
            return fetch(`https://tdball.net/api/in-water/?latitude=${coordinateObject.latitude}&longitude=${coordinateObject.longitude}`)
                .then((response) => response.json())
                .then((data) => (!data.inWater))
    }
}

