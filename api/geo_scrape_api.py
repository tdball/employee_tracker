import os
import json
from functools import lru_cache

import fiona
from shapely.geometry import Point, asShape
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/api/in-water/', methods=['GET'])
def in_water_view():
    """
    small Flask endpoint, returns JSON to function as a very basic API
    verifies that the user data has been submitted, otherwise returns
    an invalidData flag.
    :return: JSON
    """
    if request.method == 'GET':
        latitude = request.args.get('latitude')
        longitude = request.args.get('longitude')
        if latitude and longitude:
            return json.dumps({"inWater": in_water(float(latitude), float(longitude))})
        else:
            return json.dumps({"invalidData": "Please provide both `latitude` and `longitude`"})

@app.route('/api/in-water/cache', methods=['GET'])
def cache():
    """
    Implemented to track caching functionality built into in_water function. Optional
    :return: JSON
    """
    if request.method == 'GET':
        cache_info = in_water.cache_info()
        return json.dumps({
            'hits': cache_info.hits,
            'misses': cache_info.misses,
            'maxsize': cache_info.maxsize,
            'currsize': cache_info.currsize,
        })


@lru_cache(maxsize=128)
def in_water(lat: float, lon: float) -> bool:
    """
    Simple function to parse a shapefile from OpenStreet Maps.
    Returns a boolean signifying a location is or is not over
    water.

    LRU Caching provided via functools.lru_cache. Uses memoization
    to cache recently scanned results and provide large performance gains.

    :param lat: float
    :param lon: float
    :return: bool
    """
    path = os.path.abspath('water_polygons.shp')
    with fiona.open(path) as fiona_collection:
        point = Point(lon, lat)
        # here we filter to only scan results near the point in question.
        for record in fiona_collection.filter(bbox=(int(lon)+1, int(lat)+1, int(lon)-1, int(lat)-1)):
            if record['geometry']:
                shape = asShape(record['geometry'])
                if shape.contains(point):
                    return True
        return False


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3100)
