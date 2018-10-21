const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const deleteAuth = require('./middlewares/delete-authorization');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(deleteAuth);
app.use('/',routes);

app.listen(port, () => console.log(`app listening on port ${port}!`));
