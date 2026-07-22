const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Blog API is running');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
})