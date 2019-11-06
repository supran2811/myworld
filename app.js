  
const express = require('express');


//// configure mongo

/// Initialise the express server
const app = express();

const routes = require("./routes");

routes.forEach(r => {
    r(app);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log("Server is running in port:",PORT);
})