const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const bodyParser = require('body-parser')
const route = require('./src/Routes/index.routes')
const service = 'unipdb';
require('dotenv').config()

const PORT = process.env.PORT || 4000;

const checkAuth = require('./src/Middleware/checkAuth.middleware')
const { encrypt } = require('./src/utils/encdec');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	const text = `ISS ASSIGNMENT. 
	Nếu api nào bị lỗi. Vui lòng nhắn câu truy vấn của api đó cho plhoanhao. 
	Xin cảm ơn`
	res.send(text);
})

// Route for user login
app.post('/login', async (req, res) => {
	const { user, password } = req.body;
	let userDbConfig = {
		connectString: `localhost:1521/${service}`,
		user: user,
		password: password,
	};

	try {
		const connection = await oracledb.getConnection(userDbConfig);
		const result = await connection.execute(`SELECT DISTINCT * FROM LAB_USER WHERE USER_NAME = :1`, [user]);
		// If the connection is successful, the user's credentials are valid
		userDbConfig = {
			...userDbConfig,
			key: process.env.KEY,
			expire: Date.now() + 24 * 3600 * 1000
		}
		res.status(200).json({
			message: 'Login successful',
			token: encrypt(JSON.stringify(userDbConfig), process.env.SECRET),
			user_id: result.rows[0].ID,
			role: result.rows[0].ROLE
		});
	} catch (err) {
		console.error('Error logging in user:', err);
		res.status(401).json({ error: 'Invalid username or password' });
	}
});

app.use(checkAuth);

app.use('/api', route);

app.post('/data', async (req, res) => {
	const { user, password } = req.headers;
	const { query } = req.body;
	const userDbConfig = {
		connectString: `localhost:1521/${service}`,
		user: user,
		password: password,
	};
	try {
		const connection = await oracledb.getConnection(userDbConfig);
		const result = await connection.execute(query);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error('Error executing query:', err);
		res.status(400).json({ error: 'An error occurred' });
	}
});


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
