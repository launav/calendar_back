const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    //vamos a referenciar la bbdd de user
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Event', EventSchema);