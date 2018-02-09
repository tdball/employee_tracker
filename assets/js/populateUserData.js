const defaultZoom = 8
const defaultLat = 36
const defaultLng = -96
const unavailableName = 'Name N/A'

function initGoogle(id) {
    /*
    param: id (string)
    returns: map (google.maps.Map)
    Creates a map using Google's JS Map API and the `id` parameter.
     */

    let map = new google.maps.Map(document.getElementById(id), {
        center: {lat: defaultLat , lng:  defaultLng},
        zoom: defaultZoom
    })
    attachMapData(id, map)
    return map
}


function initLeaflet(id) {
    /*
    param: id (string)
    returns: map (L.map)
    Creates a map using Leaflet's JS Map API and the `id` parameter.

    Tiles hosted by mapbox, sourced from Open Street Maps
     */
    let map = L.map(id, {
        center: [defaultLat, defaultLng],
        zoom: defaultZoom
    })
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGRiYWxsIiwiYSI6ImNqZGQ2ZXN3cTBveTAzM3M0Y2hjNGdicWYifQ.8ZyvzI_lpo_YINCzf0KKrg'
    }).addTo(map);
    attachMapData(id, map)
    return map
}


function attachMapData(id, map) {
    /*
    param: id (string)
    param: map (L.map || google.maps.Map)

    Binds the map to the specified id's element stored under mapObject property.
     */
    document.getElementById(id).mapObject = map
}


function populateGoogle(userData, map) {
    /*
    param: userData (Object)
    param: map (google.maps.Map)

    Accepts a userData Object, places on the map at the specified lat/lng,
    if no icon/logo exists in the userData, google will default to the red marker.
    Creates a popup on click with the userData.name parameter.
     */
    let popup
    let marker = new google.maps.Marker({
        position: {lat: userData.latitude, lng: userData.longitude},
        map: map,
        icon: userData.logo,
    })
    if(userData.name){
        popup = new google.maps.InfoWindow({content: userData.name})
    } else {
        popup = new google.maps.InfoWindow({content: unavailableName})
    }
    marker.addListener('click', function () {
        // Emulates leaflet.js behavior of one open popup at a time
        while(googleInfoWindows.length > 0) {
            let infoWindow = googleInfoWindows.pop()
            infoWindow.popup.close(map, infoWindow.marker)
        }
        popup.open(map, marker)
        googleInfoWindows.push({popup: popup, marker: marker})
    })
    googleMarkers.push(marker)
}


function populateLeaflet(userData, map) {
    /*
    param: userData (Object)
    param: map (L.map)

    Accepts a userData Object, places on the map at the specified lat/lng,
    if no icon/logo exists in the userData, logo is left unspecified defaulting
    the blue leaflet marker. Creates a popup on click with the userData.name parameter.
     */
    let popup
    let marker = L.marker([userData.latitude, userData.longitude])
    if(userData.logo) {
        marker.options.icon = L.icon({
            iconUrl: userData.logo,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        })
    }
    if(userData.name){
        popup = marker.bindPopup(userData.name)
    } else {
        popup = marker.bindPopup(unavailableName)
    }
    marker.on('click', () => (popup.openPopup()))
    marker.addTo(map)
}