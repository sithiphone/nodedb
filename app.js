var express = require('express');
var bodyParser = require('body-parser');
var traineeRouter = require('./routes/trainee');
var userRouter = require('./routes/user');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//define the trainee route
app.use('/api/trainee', traineeRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
module.exports = app;

