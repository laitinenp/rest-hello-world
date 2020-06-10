const
	express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	cachectrl = require('express-cache-control'),
	cache = new cachectrl().middleware,
	db = require('./dbapi.js'),
	SERVER_PORT = 8888;

app.use(bodyparser.json());


// REST-arkkitehtuurityylin mukaisesti muotoiltuja esimerkkipalveluja
// GET /api/sensors
// GET /api/sensors/temperature
// PUT /api/sensors/temperature
// HEAD /api/sensors
// HEAD /api/sensors/temperature
// OPTIONS /api/sensors
// OPTIONS /api/sensors/temperature

// koko sensors-rakenteen haku
app.get('/api/sensors', (req, res) => {
	// haku tietokantamoduulin perusoperaatiolla findSensors
	db.findSensors(function( result ) {
		res.json( result )
	})
})

// Haku sensors-rakenteesta id:n perusteella.
// Sisältää myös käteismuistin hyödyntämisen s.e. käteismuistia hyödynnetään 10 minuutin ajan.
app.get('/api/sensors/:sensorid', cache('minutes',10), (req, res) => {
	let sensorid = req.params.sensorid
	db.findSensorById( sensorid, function ( aSensor ) {
		if ( aSensor != null )
			res.json( aSensor )
		else
			res.status(404).send()		// "The requested resource was not found."
	})
})

// Sensor-rakenteen päivitys HTTP:n PUT-verbillä.
app.put('/api/sensors/:sensorid', (req, res) => {
	let updatevalue = req.body
	let sensorid = req.params.sensorid
	db.modifySensorById( sensorid, updatevalue, () => {
		res.status(204).send()
	})
})

// HEAD-verbillä palvelun URL-kuvion olemassa olon tarkistus
app.head('/api/sensors', (req, res) => {
	return res.status(200).send()
})
app.head('/api/sensors/temperature', (req, res) => {
	return res.status(200).send()
})

// OPTIONS-verbillä HTTP-palveluiden luettelo
app.options('/api/sensors', (req, res) => {
	res.setHeader('Allow', 'GET,HEAD,OPTIONS')
	res.setHeader('Content-Type', 'application/json')
	return res.status(200).send()
})
app.options('/api/sensors/:id', (req, res) => {
	let sensorid = req.params.id
	db.findSensorById( sensorid, function ( aSensor ) {
		if ( aSensor != null ) {
			res.setHeader('Allow', 'GET,PUT,HEAD,OPTIONS')
			res.setHeader('Content-Type', 'application/json')
			res.setHeader('Cache-Control', 'max-age=600')
		} else {
			res.setHeader('Allow', 'OPTIONS')		// None, only the OPTIONS
		}
		res.status(204).send()		// "The HTTP 204 No Content success status response code."
	})
})

app.listen(SERVER_PORT, () =>
  	console.log('AuNe REST-palvelin toiminnassa portissa ' + SERVER_PORT + '.')
)
