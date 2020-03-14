
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const responseTime = require('response-time');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
const flash      = require('express-flash');

// configure mongo
const MONGO_URI = require('./configs/keys').mongoURI;
mongoose.connect(MONGO_URI,{ useNewUrlParser: true }).then(result => {
    logger.printLog("info", "Connection to database is sucessfull!");
});
require('./services/passport');
require("./model");

const app = express();

app.use(bodyParser.json());
app.use(compression());

app.use(morgan('tiny'));

app.use(
    responseTime((_req, res, time) => {
        res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    })
);

app.use(passport.initialize());

/// setting up routes for the app.
const routes = require("./routes");
routes.forEach(r => {
    r(app);
});

app.use((error,req,res,next) => {
    logger.printLog("error","Error occured "+error);
});


// We need flash messages to see passport errors
app.use(flash());

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        logger.printLog("info", `This App is running on port ${PORT}`);
    });
}

module.exports = app;