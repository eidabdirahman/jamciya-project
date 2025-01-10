import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
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

const News = mongoose.model("News", newsSchema);

export default News;
