
const { searchPlace } = require("../controller/searchPlaces");

module.exports = app => {
    app.get("/search" , searchPlace);
}