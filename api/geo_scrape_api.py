import os
import json

import fiona
from shapely.geometry import Point, asShape
from flask import Flask, request
app = Flask(__name__)

@app.route('/api/in-water/', methods=['GET'])
def expose_api():
    if request.method == 'GET':
        latitude = request.args.get('latitude')
        longitude = request.args.get('longitude')
        if latitude and longitude:
            return json.dumps({"inWater": in_water(float(latitude), float(longitude))})
        else:
            return json.dumps({"inWater": None})


def in_water(lat: float, lon: float) -> bool:
    """
    Simple function to parse a shapefile from OpenStreet Maps.
    Returns a boolean signifying a location is or is not over
    water.
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
    # ocean = (33.042479, -135.918978)
    # land = (36.163065, -95.971463)
    # assert in_water(*ocean)
    # assert not in_water(*land)
