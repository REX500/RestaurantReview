const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

// routes
const api = require('./api/routes/router');

// custom error handler
const HttpError = require('./api/lib/utils/http-error');

// custom logger
const { info, log, error } = require('./api/lib/utils/log');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));

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
	error(err);
	res.sendStatus(500);
});

app.listen(port, () => {
	info(`Restaurant app listening on port ${port}!`);
	log(`To use the api set start with http://localhost:${port}/api/restaurants :GET`);
});
