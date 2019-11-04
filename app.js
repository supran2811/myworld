  
const express = require('express');

//// configure routes


//// configure mongo



/// Initialise the express server
const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log("Server is running in port:",PORT);
})