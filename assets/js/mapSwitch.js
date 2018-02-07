class MapSwitch {
    /*
    Data structure to hold map state. Allows for toggling between two providers
    without incurring further page loads
    */

    constructor() {
        this.googleMapActive = true
        this.toggleButton = document.getElementById('mapToggle')
        this.mapList = []
        this.mapResize = new CustomEvent("mapResize")
        document.addEventListener("mapResize", this.resizeMaps)
    }

    resizeMaps() {
        // Hacky solution, due to display:none being the default for the leaflet map on load
        // this timeout of 1ms will let the browser swap the display to block and then the
        // size of the map will be adjusted to take up the needed space.
        setTimeout(function() {
            document.getElementById('omap').leaflet.invalidateSize()
        }, 1)
    }

    toggleMaps() {
        /*
        Retrieves the active state of the MapSwitch object and swaps between either
        leaflet or googlemaps as a provider for the Map
         */
        document.dispatchEvent(this.mapResize)
        this.googleMapActive = !this.googleMapActive

        let openMap = document.getElementById('omap')
        let googleMap = document.getElementById('gmap')

        if(this.googleMapActive) {
            this.provider = 'google'
            this.toggleButton.innerText = 'OpenStreet Maps'
            openMap.style.display = 'none'
            googleMap.style.display = 'block'
        } else {
            this.provider = 'leaflet'
            this.toggleButton.innerText = 'Google Maps'
            openMap.style.display = 'block'
            googleMap.style.display = 'none'
        }
    }

}


