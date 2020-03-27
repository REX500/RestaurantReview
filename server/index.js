

const express = require('express');

const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const morgan = require('morgan');

// const fs = require('fs');

const bodyParser = require('body-parser');

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));

const port = 3000;

app.get('/restaurants', async (req, res) => {
	let restaurants;

	try {
		restaurants = db.getData('/restaurants');
		res.json(restaurants.restaurants);
	} catch (error) {
		res.json({error: 'Error occured while fetching restaurants'});
	}
});

app.get('/images/:image', (req, res) => {
	res.sendFile(`${__dirname}'/shapes/'${req.params.image}`);
});

app.post('/review', (req, res) => {
	// get payload from the body
	const data = req.body;

	try {
		// first get all restaurants
		let restaurants = db.getData('/restaurants');
	
		// find restaurant
		let restaurant = restaurants.restaurants.find(entry => entry.id === data.id);
	
		// add review to restaurant body
		restaurant = {
			...restaurant,
			reviews: [
				...restaurant.reviews,
				data.review
			]
		};
	
		// append review to the restaurant object
		restaurants = restaurants.restaurants.map(entry => {
			if (entry.id === data.id) return restaurant;
			return entry;
		});
	
		db.push('/restaurants', {restaurants});

		setTimeout(() => {
			res.json(restaurant);
	}, 2000);
	} catch (error) {
		res.json({error: 'Error occured while adding a review'});
	}
});

app.listen(port, () => {
	// add restaurants to db so we can work with them
	// let data = fs.readFileSync('db/database.json', 'utf8');
	// // make sure data is in json format
	// data = JSON.parse(data);

	// // push to db
	// db.push('/restaurants', data);

	// eslint-disable-next-line no-console
	console.info(`Restaurant app listening on port ${port}!`);
});
