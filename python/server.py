import dbapi
import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# alustetaan tietokanta temperature-oliolla demoa varten
temperature = {
    'name': 'temperature',
    'value': 0,
    'unit': 'Celsius'
}
dbapi.connect()
dbapi.create(temperature)

# Kaikkien sensoreiden luettelo.
@app.route('/api/sensors', methods=['GET', 'HEAD', 'OPTIONS'])
def api_sensors():
    if request.method == 'GET':
        result = dbapi.findAll()
        return jsonify( result )
    elif request.method == 'HEAD':
        return jsonify(success=True)
    elif request.method == 'OPTIONS':
        resp = flask.Response()
        resp.headers['Allow'] = 'GET,HEAD,OPTIONS'
        return jsonify(resp)

# Yksittäisen sensorin tietueen haku (tässä tapauksessa) nimen perusteella
# Huomaa URL-kuvion muuttuja <sensor_name>, joka yhdistetään routeen liitetyn
# funktion sensor_name-parametriin
@app.route('/api/sensors/<sensor_name>', methods=['GET', 'PUT', 'OPTIONS'])
def api_sensors_temperature(sensor_name):
    if request.method == 'GET':
        result = dbapi.findByName( sensor_name )
        return jsonify( result )
    elif request.method == 'PUT':
        # päivitetään temperature-tietorakenne pyynnön body-osan rakenteen mukaisesti
        temperature.update( request.json )
        # HTTP PUT -pyynnön onnistuminen kuitataan koodilla HTTP 200
        return jsonify( success=True )
    elif request.method == 'OPTIONS':
        resp = flask.Response()
        resp.headers['Allow'] = 'GET,PUT,HEAD,OPTIONS'
        resp.headers['Content-Type'] = 'application/json'
        return resp

app.run()
