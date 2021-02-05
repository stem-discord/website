const { Schema } = require(`mongoose`);

const memeSchema = new Schema({
  ownerId: {
    type: String,
  },
  url: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      timestamp: {
        type: Number,
        required: true,
      },
      authorId: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = memeSchema;