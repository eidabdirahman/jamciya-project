import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import Users from './data/Users.js';
import Departments from './data/Departments.js';
import News from './data/News.js';
import Projects from './data/Projects.js';
import Blogs from './data/Blogs.js';
import Achievements from './data/Achievements.js';
import Partners from './data/Partners.js'; // Import sample partner data
import User from './models/UserModal.js';
import Department from './models/DepartmentModal.js';
import NewsModel from './models/NewsModal.js';
import Project from './models/ProjectModal.js';
import Blog from './models/BlogModal.js';
import Achievement from './models/AchievementModal.js';
import Partner from './models/PartnerModal.js'; // Import Partner model
import ConnectDB from './Config/db.js';

dotenv.config();

ConnectDB();

const importData = async () => {
    try {
        console.log('Starting data import...'); // Logging

        // Delete existing data
        await User.deleteMany();
        console.log('Users deleted');

        await Department.deleteMany();
        console.log('Departments deleted');

        await NewsModel.deleteMany();
        console.log('News deleted');

        await Project.deleteMany();
        console.log('Projects deleted');

        await Blog.deleteMany();
        console.log('Blogs deleted');

        await Achievement.deleteMany();
        console.log('Achievements deleted');

        await Partner.deleteMany();
        console.log('Partners deleted');

        // Insert new data
        const createdUsers = await User.insertMany(Users);
        console.log('Created Users:', createdUsers);

        const adminUser = createdUsers[0]._id;

        const sampleDepartments = Departments.map((department) => {
            return { ...department, user: adminUser };
        });
        await Department.insertMany(sampleDepartments);
        console.log('Inserted Departments');

        const sampleNews = News.map((news) => {
            return { ...news, user: adminUser };
        });
        await NewsModel.insertMany(sampleNews);
        console.log('Inserted News');

        const sampleProjects = Projects.map((project) => {
            return { ...project, user: adminUser };
        });
        await Project.insertMany(sampleProjects);
        console.log('Inserted Projects');

        const sampleBlogs = Blogs.map((blog) => {
            return { ...blog, user: adminUser };
        });
        await Blog.insertMany(sampleBlogs);
        console.log('Inserted Blogs');

        const sampleAchievements = Achievements.map((achievement) => {
            return { ...achievement, user: adminUser };
        });
        await Achievement.insertMany(sampleAchievements);
        console.log('Inserted Achievements');

        const samplePartners = Partners.map((partner) => {
            return { ...partner, user: adminUser };
        });
        await Partner.insertMany(samplePartners);
        console.log('Inserted Partners');

        console.log(colors.green('Data Imported!'));
        process.exit();

    } catch (error) {
        console.log(colors.red(`Error: ${error.message}`));
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        console.log('Starting data destruction...'); // Logging

        // Delete existing data
        await User.deleteMany();
        console.log('Users deleted');

        await Department.deleteMany();
        console.log('Departments deleted');

        await NewsModel.deleteMany();
        console.log('News deleted');

        await Project.deleteMany();
        console.log('Projects deleted');

        await Blog.deleteMany();
        console.log('Blogs deleted');

        await Achievement.deleteMany();
        console.log('Achievements deleted');

        await Partner.deleteMany();
        console.log('Partners deleted');

        console.log(colors.red('Data Destroyed!'));
        process.exit();

    } catch (error) {
        console.log(colors.red(`Error: ${error.message}`));
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
