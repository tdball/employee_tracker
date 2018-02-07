defaultZoom = 8
defaultLat = 36
defaultLng = 97

function initGoogle(id) {
    // Creates a map using Google's JS Map API
    let map = new google.maps.Map(document.getElementById(id), {
        center: {lat: userData[0].latitude || defaultLat , lng: userData[0].longitude || defaultLng},
        zoom: defaultZoom
    })
    attachMapData(id, map)
    return map
}

function initLeaflet(id) {
    // Creates a Leaflet JS map using open street maps tiles
    let map = L.map(id, {
        center: [userData[0].latitude || defaultLat, userData[0].longitude || defaultLng],
        zoom: defaultZoom
    })
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 8,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGRiYWxsIiwiYSI6ImNqZGQ2ZXN3cTBveTAzM3M0Y2hjNGdicWYifQ.8ZyvzI_lpo_YINCzf0KKrg'
    }).addTo(map);
    attachMapData(id, map)
    return map
}

function attachMapData(id, map) {
    // Binds the map to it's element stored under mapObject,
    // allows for access outside lexical scope
    document.getElementById(id).mapObject = map
}

function populateGoogle(userData, map) {
    let marker = new google.maps.Marker({
        position: {lat: userData.latitude, lng: userData.longitude},
        map: map,
        icon: userData.logo,
    })
    let popup = new google.maps.InfoWindow({
        content: userData.name
    })
    marker.addListener('click', function() {
        popup.open(map, marker)
    })
}

function populateLeaflet(userData, map) {
    let marker = L.marker([userData.latitude, userData.longitude])
    if(userData.logo) {
        marker.options.icon = L.icon({
            iconUrl: userData.logo,
            iconSize: [32, 32],
            iconAnchor: [0, 0],
            popupAnchor: [-3, -76],
        })
    }
    console.log(marker)
    let popup = marker.bindPopup(userData.name)
    marker.on('click', () => (popup.openPopup()))
    marker.addTo(map)
}
