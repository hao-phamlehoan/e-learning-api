const express = require('express');
const oracledb = require('oracledb');
const logger = require('morgan');
const bodyParser = require('body-parser')

require('dotenv').config()

const usersRouter = require('./Routes/users.routes');
const adminRouter = require('./Routes/admin.routes');
const checkAuth = require('./src/Middleware/checkAuth.middleware')
const { encrypt } = require('./src/utils/encdec');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// const dbConfig = {
// 	user: 'your_username',
// 	password: 'your_password',
// 	connectString: 'your_connect_string', // e.g., 'localhost:1521/your_service_name'
// };

// // Establish a connection to the Oracle Database
// async function connectToDatabase() {
// 	try {
// 		await oracledb.createPool(dbConfig);
// 		console.log('Connected to Oracle Database');
// 	} catch (err) {
// 		console.error('Error connecting to Oracle Database:', err);
// 	}
// }

// // Middleware to establish the Oracle DB connection
// app.use((req, res, next) => {
// 	if (!oracledb.getPool()) {
// 		connectToDatabase();
// 	}
// 	next();
// });

// Route for user login
app.post('/login', async (req, res) => {
	const { username, password, service } = req.body;
	const userDbConfig = { 
		connectString: `localhost:1521/${service}`,
		user: username, 
		password: password 
	};

	try {
		const connection = await oracledb.getConnection(userDbConfig);
		// If the connection is successful, the user's credentials are valid
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

app.get('/get_data', async (req, res) => {
	const { username, password, service } = req.header;
	const userDbConfig = { 
		connectString: `localhost:1521/${service}`,
		user: username, 
		password: password 
	};
	try {
		const connection = await oracledb.getConnection(userDbConfig);
		const result = await connection.execute('SELECT * FROM your_table');
		res.json(result.rows);
	} catch (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'An error occurred' });
	}
});

app.use('/users', usersRouter);
app.use('/admin', adminRouter)

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

module.exports = app;
