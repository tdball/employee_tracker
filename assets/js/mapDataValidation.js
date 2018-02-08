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
        fetch(`https://tdball.net/api/in-water/?latitude=${coordinateObject.latitude}&longitude=${coordinateObject.longitude}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data.inWater
            })
    }
}

