import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  PublishedAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  AuthorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
