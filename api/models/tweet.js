import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const nestedSchema = new Schema({
  text: { type: 'String', required: true },
});

const tweetSchema = new Schema({
  id: { type: 'Number', required: true },
  created_at: { type: 'String', required: true },
  lang: { type: 'String', required: true },
  favorite_count: { type: 'Number', required: true },
  hashtags: { type: [nestedSchema], required: true},
});

export default mongoose.model('Tweet', tweetSchema, "raw_tweets");
