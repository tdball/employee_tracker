function validCoordinate(coordinateObject) {
    /*
    param: coordinateObject (Object)
    return: bool

    Takes a coordinateObject and parses it's latitude/longitude to verify they're sane results.
    Will automatically strip invalid ranges, and all major bodies of water from the results as well.
     */
    // Make sure we have coordinates
    if (!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    }

    // Make sure they are within a sane range
    if(coordinateObject.latitude > 90 || coordinateObject.latitude < -90) {
        return false
    }
    if(coordinateObject.longitude > 180 || coordinateObject.longitude < -180){
        return false
    }
    return fetch(`https://tdball.net/api/in-water/?lat=${coordinateObject.latitude}&lng=${coordinateObject.longitude}`)
        .then((response) => response.json())
        .then((data) => (!data.inWater))
}

