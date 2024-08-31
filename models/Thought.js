const { Schema, model } = require('mongoose');

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Function to format timestamp
function dateFormat(timestamp) {
  return new Date(timestamp).toISOString();
}

// virtual property reactionCount on the Thought schema
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;