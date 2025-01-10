import Achievement from '../models/AchievementModal.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all achievements
const getAchievements = asyncHandler(async (req, res) => {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
});

// Create a new achievement
const createAchievement = asyncHandler(async (req, res) => {
    const { Title, Description, UserID } = req.body;
    const newAchievement = new Achievement({ Title, Description, UserID });

    await newAchievement.save();
    res.status(201).json(newAchievement);
});

// Get a single achievement by ID
const getAchievementById = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    res.status(200).json(achievement);
});

// Update an achievement
const updateAchievement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { Title, Description, UserID } = req.body;

    const updatedAchievement = await Achievement.findByIdAndUpdate(id, { Title, Description, UserID }, { new: true });
    if (!updatedAchievement) return res.status(404).json({ message: 'Achievement not found' });
    res.status(200).json(updatedAchievement);
});

// Delete an achievement
const deleteAchievement = asyncHandler(async (req, res) => {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) return res.status(404).json({ message: 'Achievement not found' });
    res.status(200).json({ message: 'Achievement deleted successfully' });
});

export {
    getAchievements,
    createAchievement,
    getAchievementById,
    updateAchievement,
    deleteAchievement
};
