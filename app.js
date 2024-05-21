var express = require('express');
var traineeRouter = require('./routes/trainee');
var app = express();
//define the trainee route
app.use('/api/trainee', traineeRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
module.exports = app;

