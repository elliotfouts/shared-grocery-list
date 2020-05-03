// -----------------------------
// Dependencies
// -----------------------------
const express = require('express');
const path = require('path');
const connection = require('./connection');

// instantiate express
const app = express();
// configure port to be injected by heroku
const PORT = process.env.PORT || 8080;

// -----------------------------
// Middleware
// -----------------------------

// set up express to serve static files from public directory
app.use(express.static('public'));
// set up express to handle excrypted payloads in POST requests (saves payload to req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
})
	.get('/api', (req, res) => {
		connection.query('SELECT * FROM groceries', (err, data) => {
			if (err) throw err;
			res.send(data);
		});
	})
	.post('/', (req, res) => {
		const { name, quantity, category } = req.body;
		connection.query(
			'INSERT INTO groceries (name, quantity, category) VALUES (?, ?, ?);',
			[name, quantity, category],
			(err, data) => {
				if (err) {
					res.status(500).end();
				}
				res.status(200).end();
			}
		);
	})
	.delete('/api/:id', (req, res) => {
		let id = req.params.id;
		connection.query('DELETE FROM groceries WHERE id = ?', [id], (err, data) => {
			if (err) {
				res.status(500).end();
				throw err;
			}
			res.status(200).end();
		});
	})
	// .put('api/:id', (req, res)=>{
	// 	let id = req.params.id;
	// 	connection.query('UPDATE GROCERIES ')
	// })

// -----------------------------
// Start Server
// -----------------------------
app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
