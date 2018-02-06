
function toggleMaps() {
    googleMapActive = !googleMapActive
    let openMap = document.getElementById('omap')
    let googleMap = document.getElementBy('id')
    if(google) {
        openMap.style.display = 'hidden'
        googleMap.style.display = 'block'
    } else {
        openMap.style.display = 'block'
        googleMap.style.display = 'hidden'
    }
}

