# Tracker
A web application for tracking field tech locations. Test data fetch()'d from
a local .json file, however this is easily attachable to an API for live updates.

## Project Guidelines
* Restricted to only Google Maps and Leaflet JS
* Develop two identical map implementations using both libraries
* Able to toggle between the both maps without a refresh
* Loads and parses local data.json for dataset
* Validates locations and discards invalid, including bodies of water
* When a marker is clicked, it's name should be displayed.
* Map(s) are to be full screen, with no scrollbars
* If Google Maps is in use Autocomplete Places Search should be available
  * This should remove all existing markers and add place new autocomplete markers
  * Optional, after doing a places search it should reset the markers to the original sites


## Usage
Built using LeafletJS and Google Maps Javascript API. 

```bash
git clone https://github.com/tdball/tracker.git
cd tracker
docker build . -t tdball/tracker:latest
docker run --rm -d -p 3500:80 --name tracker tdball/tracker:latest
```
Then visit http://localhost:3500 in your browser. 


## Extras
I had a difficult time finding an existing solution (that wasn't trying to verify
types on reverse geocoded Google Maps results) for determining if a lat/lng point
was over a body of water. I've implemented a very basic API using Flask, shapely,
fiona, and the water-polygon shapefiles provided at 
[OpenStreetMapData](http://openstreetmapdata.com/data/water-polygons). This just 
responds with a boolean answer when you submit a lat/lng coordinate whether true,
it is over water, or false it is not. 