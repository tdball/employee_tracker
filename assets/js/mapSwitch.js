class MapSwitch {
    /*
    Data structure to hold map state. Allows for toggling between two providers
    without incurring further page loads
    */

    constructor() {
        this.googleMapActive = true
        this.toggleButton = document.getElementById('map-toggle')
        this.mapResize = new CustomEvent("mapResize")
        this.leafletMap = document.getElementById('leaflet-map')
        this.googleMap = document.getElementById('google-map')
        this.googleSearch = document.getElementById('google-search')
        document.addEventListener("mapResize", this.resizeMaps)
    }

    resizeMaps() {
        /*
         Hacky solution, due to display:none being the default for the leaflet map on load
         this timeout of 1ms will let the browser swap the display to block and then the
         size of the map will be adjusted to take up the needed space.

         Alternatives, render both maps fullscreen and swap their z-indexes, however I believe
         the performance benefit to only having the canvas render one map at a time would make
         up for this workaround.
          */
        setTimeout(function() {
            let leafletMap = document.getElementById('leaflet-map')
            leafletMap.mapObject.invalidateSize()
        }, 1)
    }

    toggleMaps() {
        /*
        Retrieves the active state of the MapSwitch object and swaps between either
        leaflet or googlemaps as a provider for the Map
         */
        document.dispatchEvent(this.mapResize)
        this.googleMapActive = !this.googleMapActive


        if(this.googleMapActive) {
            let center = this.leafletMap.mapObject.getCenter()
            let zoom = this.leafletMap.mapObject.getZoom()
            // Apply the current center/zoom to the new map view
            this.googleMap.mapObject.setCenter({lat: center.lat, lng: center.lng})
            this.googleMap.mapObject.setZoom(zoom)

            this.toggleButton.innerText = 'Toggle OpenStreet Maps'
            this.leafletMap.style.display = 'none'
            this.googleMap.style.display = 'block'
            this.googleSearch.style.display = 'flex'
        } else {
            let center = this.googleMap.mapObject.getCenter()
            let zoom = this.googleMap.mapObject.getZoom()
            // Apply the current center/zoom to the new map view
            this.leafletMap.mapObject.setView(new L.LatLng(center.lat(), center.lng()), zoom)

            this.toggleButton.innerText = 'Toggle Google Maps'
            this.leafletMap.style.display = 'block'
            this.googleMap.style.display = 'none'
            this.googleSearch.style.display = 'none'
        }
    }

}


