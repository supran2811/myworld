const { model, Schema } = require('mongoose');

const tripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    places: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Place',
            startDate: Schema.Types.Date,
            endDate: Schema.Types.Date,
            bookmarks: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Place'
                }
            ],
        }
    ],
    tickets: {
        type: Schema.Types.Array
    },
    photos: {
        type: Schema.Types.Array
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = new model('Trip', tripSchema);