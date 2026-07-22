require('dotenv').config();
const dns = require('dns');
if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}
const express = require('express');
const cors = require("cors");

const dbConnect = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

dbConnect();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Blog API is running');
});


app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
})