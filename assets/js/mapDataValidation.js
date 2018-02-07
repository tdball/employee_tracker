function validateCoordinates(coordinateObject) {
    // Quick and dirty validation, needs improvement once I've learned how to determine
    // If a location is water or not.
    // TODO: Revise this method, just a placeholder for now
    if(!coordinateObject.latitude || !coordinateObject.longitude) {
        return false
    } else {
        return true
    }
}