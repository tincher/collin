const express = require('express');
const app = express();

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/test', (req, res) => {
    res.send("test successfull");
});