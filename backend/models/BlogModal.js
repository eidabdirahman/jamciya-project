import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
      },
    PublishedAt: {
        type: Date,
        default: Date.now
    },
    AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
