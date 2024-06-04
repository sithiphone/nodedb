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

//catch error and forward to error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    
    return res.status(status).json({
        error: {
            status: status,
            message: err.message,
            validation: err.validation
        }
    });
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
module.exports = app;

