function validCoordinate(coordinateObject, delay) {
    // Make sure we have coordinates
    if (!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    } else {
        return true
        /*
        // If we do verify that they aren't over some form of water
        // TODO: check all types on google's API
        // TODO: Stumped here, Google's API has access limits, major impact on user experience.
        // TODO: Maybe some low level range checking may suffice.
        // TODO: Seems the proper solution is to cache locations server side
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({
            'location': {lat: coordinateObject.latitude, lng: coordinateObject.longitude}
        }, geocodeHandler)
        */
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

