const
	express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	cachectrl = require('express-cache-control'),
	cache = new cachectrl().middleware,
	SERVER_PORT = 8888;

app.use(bodyparser.json());

// Temperature on ainoa data jota tässä esimerkissä käsitellään. Tallennettaisiin normaalisti tietokantaan.
var temperature = { value: 20, unit: 'Celsius' }			
// Simuloidaan yksinkertaista tietokantataulua.
var sensors = [ temperature ]


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
	// palvelussa hyödynnetään sensors-tietorakennetta
	return res.json( sensors )
})

// Haku sensors-rakenteesta: temperature-tietue.
// Sisältää myös käteismuistin hyödyntämisen s.e. käteismuistia hyödynnetään 10 minuutin ajan.
app.get('/api/sensors/temperature', cache('minutes',10), (req, res) => {
	return res.json( temperature )
})

// Temperature-rakenteen päivitys HTTP:n PUT-verbillä.
app.put('/api/sensors/temperature', (req, res) => {
	temperature = req.body
  	return res.send('kutsu PUT HTTP /api/sensors/temperature ' + temperature)
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
app.options('/api/sensors/temperature', (req, res) => {
	res.setHeader('Allow', 'GET,PUT,HEAD,OPTIONS')
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 'max-age=600')
	return res.status(200).send()
})

app.listen(SERVER_PORT, () =>
  	console.log('AuNe REST-palvelin toiminnassa portissa ' + SERVER_PORT + '.')
)
