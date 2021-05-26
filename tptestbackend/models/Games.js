const { Schema, model } = require('mongoose');

const GamesSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    linkImage: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

GamesSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Favorites', GamesSchema);