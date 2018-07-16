const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('build'));
app.use('build', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/build/service-worker.js`);
  res.sendFile(`${__dirname}/build/`);
});



app.listen(PORT, _ => {
    console.log(`Express server is now listening on PORT=${PORT}`);
});