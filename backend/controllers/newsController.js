import News from '../models/NewsModal.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all news
const getNews = asyncHandler(async (req, res) => {
    const news = await News.find();
    res.status(200).json(news);
});

// Create a new news article
const createNews = asyncHandler(async (req, res) => {
    const { Title, Content, AuthorID } = req.body;
    const newNews = new News({ Title, Content, AuthorID });

    await newNews.save();
    res.status(201).json(newNews);
});

// Get a single news article by ID
const getNewsById = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.status(200).json(news);
});

// Update a news article
const updateNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { Title, Content, AuthorID } = req.body;

    const updatedNews = await News.findByIdAndUpdate(id, { Title, Content, AuthorID }, { new: true });
    if (!updatedNews) return res.status(404).json({ message: 'News not found' });
    res.status(200).json(updatedNews);
});

// Delete a news article
const deleteNews = asyncHandler(async (req, res) => {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: 'News not found' });
    res.status(200).json({ message: 'News deleted successfully' });
});

export {
    getNews,
    createNews,
    getNewsById,
    updateNews,
    deleteNews
};
