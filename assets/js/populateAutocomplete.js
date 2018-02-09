function populateAutocomplete() {
    /*
    Retrieves the Place object from the autocomplete field and places a marker on the map.

    Hides all initial markers placed in reference to the data.json file.
     */
    for(let marker of googleMarkers){
        marker.setVisible(false)
    }
    let searchField = document.getElementById('google-autocomplete')
    let place = searchField.autoComplete.getPlace()
    let googleMap = document.getElementById('google-map').mapObject
    if(place.geometry) {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: googleMap
        })
        autoCompleteMarkers.push(marker)
    }

}

function googleAutocomplete() {
    /*
    Attaches an autocomplete object to the search box. Triggers the populateAutocomplete callback
    when a location is selected in the search box. Clear button resets the map to its initial state,
    deleting the autocomplete markers.
     */
    let searchField = document.getElementById('google-autocomplete')
    searchField.autoComplete = new google.maps.places.Autocomplete(searchField)
    let clearButton = document.getElementById('google-search-button')
    clearButton.onclick = function () {
        searchField.value = null
        for(let marker of autoCompleteMarkers) {
            marker.setMap(null)
        }
        for(let marker of googleMarkers) {
            marker.setVisible(true)
        }
    }
    searchField.autoComplete.addListener('place_changed', populateAutocomplete)
}