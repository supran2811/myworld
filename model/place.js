const { model, Schema } = require('mongoose');

const placeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    short_name: {
        type: String,
        required: true
    },
    long_name:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    contact: {
        type: String
    },
    geometry: {
        type: Schema.Types.Map,
        required: true
    }
    ,
    trips: [
        {
            tripId: {
                type: Schema.Types.String,
                ref: 'Trip'
            }
        }
    ],
    coverPhoto: {
        type: Schema.Types.String
    }
}, { timestamps: true });

module.exports = new model('Place', placeSchema);