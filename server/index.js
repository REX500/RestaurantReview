const express = require('express');

const morgan = require('morgan');

// const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();

// routes
const api = require('./api/routes/router');

// custom error handler
const HttpError = require('./api/lib/utils/http-error');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(cors());

const port = 3000;

app.get('/images/:image', (req, res) => {
	res.sendFile(`${__dirname}'/shapes/'${req.params.image}`);
});

// your routing starts here
app.use('/api', api);

// handle errors we throw
// eslint-disable-next-line consistent-return
app.use((err, req, res) => {
	if (err instanceof HttpError) {
		res.status(err.httpStatus);
		if (err.body) {
			return res.json(err.body);
		}
		return res.end(err.message);
	}
	// eslint-disable-next-line no-console
	console.log(err);
	res.sendStatus(500);
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
