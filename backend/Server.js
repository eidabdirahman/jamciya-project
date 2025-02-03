import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS middleware
import ConnectDB from './Config/db.js';
import departmentRoutes from './routes/departmentRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import partnerRoutes from './routes/PartnerRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

dotenv.config();

// Connect to Database
ConnectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://jamciya-project.vercel.app', // Replace with your frontend domain
  credentials: true,
}));


// Serve static files from the "uploads" directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Route handler for /blogs
app.get('/blogs', (req, res) => {
  res.redirect('/api/blogs');
});

// Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/videos', videoRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
