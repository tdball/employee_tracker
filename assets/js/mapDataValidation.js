function validCoordinate(coordinateObject) {
    // Make sure we have coordinates
    if (!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    }
    // If we do verify that they aren't over some form of water
    // TODO: check all types on google's API
    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({
        'location': {lat: coordinateObject.latitude, lng: coordinateObject.longitude}
    }, geocodeHandler)
}

function geocodeHandler(results, status) {
    if (status === 'OK') {
        console.log(results)
        for (let result of results) {
            for (let type of result.types) {
                if (type === 'sea' || 'ocean' || 'lake') {
                    return false
                } else {
                    return true
                }
            }
        }
    } else {
        // TODO: add better error handling here
        return false
    }
}

