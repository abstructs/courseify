const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

// app.use(cors);
app.use(express.static(path.join(__dirname, 'build')));
// app.use('build', express.static('static'));

app.get('/*', function (req, res) {
    // res.sendFile(`${__dirname}/build/service-worker.js`);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(PORT, _ => {
    console.log(`Express server is now listening on PORT=${PORT}`);
});