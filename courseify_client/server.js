var express = require('express');
var app = express();
const PORT = process.env.PORT || 8080;

app.use('/build', express.static('static'));
app.use(express.static('build'));
app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/public/`);
})

app.listen(PORT, _ => {
    console.log(`Express server is now listening on PORT=${PORT}`);
});