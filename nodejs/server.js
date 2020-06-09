const
	express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	cachectrl = require('express-cache-control'),
	cache = new cachectrl().middleware;

app.use(bodyparser.json());

// ainoa data jotä tässä käsitellään. Simuloi tietokantataulua tms.
var temperature = { value: 20, unit: 'Celsius' }			// lämpötilasensorin muuttuja, tallennetaan normaalisti tietokantaan
var sensors = [ temperature ]

app.get('/api/sensors', (req, res) => {
	// tähän tietokannan haku tehtävänannon esimerkin mukaisesti
	return res.json( sensors )
})

app.get('/api/sensors/temperature', cache('minutes',10), (req, res) => {
	return res.json( temperature )
})

app.put('/api/sensors/temperature', (req, res) => {
	temperature = req.body
  	return res.send('kutsu PUT HTTP /api/sensors/temperature ' + temperature)
})

app.head('/api/sensors/temperature', (req, res) => {
	return res.status(200).send()
})

app.options('/api/sensors/temperature', (req, res) => {
	res.setHeader('Allow', 'GET,PUT,HEAD,OPTIONS')
	res.setHeader('Content-Type', 'application/json')
	return res.status(200).send()
})

app.listen(8888, () =>
  	console.log('AuNe REST-palvelin toiminnassa portissa 8888.'),
)
