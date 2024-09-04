const { Schema, Types } = require('mongoose');
 

// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

function dateFormat(timestamp) {
    return new Date(timestamp).toISOString();
  }

module.exports = reactionSchema;