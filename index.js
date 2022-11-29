require('dotenv').config()
const express = require('express');
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');

const route = require('./src/routes')
const app = express();
const port = 5000;
const db = require('./src/config/db')

db.connect()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())
app.use(morgan('combined'));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})