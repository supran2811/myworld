
const mbxClient = require("@mapbox/mapbox-sdk");

const geoCodingClient = require("@mapbox/mapbox-sdk/services/geocoding");

const baseClient = mbxClient({ accessToken: 'pk.eyJ1Ijoic3VwcmFuMjgxMSIsImEiOiJjazV5N3UycGwxaGY2M2VvMHpoOG50cmM0In0.b1TqdGFAFNgUYZYTAsExZQ' });

const geoCodingServices = geoCodingClient(baseClient);

exports.searchPlace = (req, res, next) => {

    const { place } = req.query;
    geoCodingServices.forwardGeocode({
        query: place,
        limit: 5
    })
        .send()
        .then(response => {
            res.status(200).send({ message: response.body });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Bad request' })
        });

}