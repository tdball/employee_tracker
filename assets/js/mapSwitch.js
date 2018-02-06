class MapSwitch {
    /*
    Data structure to hold map state. Allows for toggling between two providers
    without incurring further page loads
    */

    constructor() {
        this.googleMapActive = true
    }

    toggleMaps() {
        /*
        Retrieves the active state of the MapSwitch object and swaps between either
        leaflet or googlemaps as a provider for the Map
         */
        console.log(this.googleMapActive)
        this.googleMapActive = !this.googleMapActive
        let openMap = document.getElementById('omap')
        let googleMap = document.getElementById('gmap')
        if(this.googleMapActive) {
            this.provider = 'google'
            openMap.style.display = 'none'
            googleMap.style.display = 'block'
        } else {
            this.provider = 'leaflet'
            openMap.style.display = 'block'
            googleMap.style.display = 'none'
        }
    }

}


