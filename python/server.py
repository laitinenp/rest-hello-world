import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Simuloidaan tietokantaa sensors-kokoelmalla.
temperature =     {
        'id': 0,
        'name': 'temperature',
        'value': 0,
        'unit': 'Celsius'
     }
sensors = [
    temperature
]


# Kaikkien sensoreiden luettelo.
@app.route('/api/sensors', methods=['GET', 'HEAD', 'OPTIONS'])
def api_sensors():
    if request.method == 'GET':
        return jsonify(sensors)
    elif request.method == 'HEAD':
        return jsonify(success=True)
    elif request.method == 'OPTIONS':
        resp = flask.Response()
        resp.headers['Allow'] = 'GET,HEAD,OPTIONS'
        return jsonify(resp)

# Temperature-sensori
@app.route('/api/sensors/temperature', methods=['GET', 'PUT', 'OPTIONS'])
def api_sensors_temperature():
    if request.method == 'GET':
        return jsonify(temperature)
    elif request.method == 'PUT':
        # päivitetään temperature-tietorakenne pyynnön body-osan rakenteen mukaisesti
        temperature.update(request.json)
        # HTTP PUT -pyynnön onnistuminen kuitataan koodilla HTTP 200
        return jsonify(success=True)
    elif request.method == 'OPTIONS':
        resp = flask.Response()
        resp.headers['Allow'] = 'GET,PUT,HEAD,OPTIONS'
        resp.headers['Content-Type'] = 'application/json'
        return resp

app.run()
