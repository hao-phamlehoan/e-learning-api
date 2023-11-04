const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const oracledb = require('oracledb');
const logger = require('morgan');
const bodyParser = require('body-parser')

require('dotenv').config()

const PORT = process.env.PORT || 4000;

const checkAuth = require('./src/Middleware/checkAuth.middleware')
const { encrypt } = require('./src/utils/encdec');

const app = express();
app.use(cors());
app.use(morgan('combined'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send("ISS");
})


// Route for user login
app.post('/login', async (req, res) => {
	const { user, password, service } = req.body;
	let userDbConfig = {
		connectString: `localhost:1521/${service}`,
		user: user,
		password: password,
	};

	try {
		const connection = await oracledb.getConnection(userDbConfig);
		const result = await connection.execute('SELECT * FROM all_users');

		// If the connection is successful, the user's credentials are valid
		userDbConfig = {
			...userDbConfig,
			service: service,
			key: process.env.KEY,
			expire: Date.now() + 24 * 3600 * 1000
		}
		res.status(200).json({
			message: 'Login successful',
			token: encrypt(JSON.stringify(userDbConfig), process.env.SECRET)
		});
	} catch (err) {
		console.error('Error logging in user:', err);
		res.status(401).json({ error: 'Invalid username or password' });
	}
});

app.use(checkAuth);

app.get('/get-data', async (req, res) => {
	const { user, password, service } = req.body;
	const userDbConfig = {
		connectString: `localhost:1521/${service}`,
		user: user,
		password: password,
	};
	try {
		const connection = await oracledb.getConnection(userDbConfig);
		const result = await connection.execute('SELECT * FROM all_users');
		res.json(result.rows);
	} catch (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'An error occurred' });
	}
});

// app.use('/users', usersRouter);
// app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).json({
		message: "No such route exists"
	})
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500).json({
		message: "Error Message"
	})
});

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
