const express = require('express');
const app = express();

// Routes

const port = 3001;
module.exports = app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});