const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/public'));

app.listen(process.env.PORT || 8180);
console.log('Server listening on port 8180');
