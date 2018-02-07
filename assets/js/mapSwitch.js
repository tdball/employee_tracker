class MapSwitch {
    /*
    Data structure to hold map state. Allows for toggling between two providers
    without incurring further page loads
    */

    constructor() {
        this.googleMapActive = true
        this.toggleButton = document.getElementById('mapToggle')
    }

    toggleMaps() {
        /*
        Retrieves the active state of the MapSwitch object and swaps between either
        leaflet or googlemaps as a provider for the Map
         */
        this.googleMapActive = !this.googleMapActive
        let openMap = document.getElementById('omap')
        let googleMap = document.getElementById('gmap')
        if(this.googleMapActive) {
            this.provider = 'google'
            this.toggleButton.innerText = 'Switch To Leaflet'
            openMap.style.display = 'none'
            googleMap.style.display = 'block'
        } else {
            this.provider = 'leaflet'
            this.toggleButton.innerText = 'Switch To Google'
            openMap.style.display = 'block'
            googleMap.style.display = 'none'
        }
    }

}


