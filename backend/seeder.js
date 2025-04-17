import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../backend/models/job.js'
import jobs from './data/jobs.js';

dotenv.config();

const uploadsDir = path.join(path.resolve(), 'uploads');

// Create uploads folder if not exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Copy placeholder logos into uploads folder
const copyPlaceholderLogos = () => {
  const logoSource = path.join(path.resolve(), 'backend', 'sampleImages');

  for (let i = 1; i <= 8; i++) {
    const src = path.join(logoSource, `logo${i}.png`);
    const dest = path.join(uploadsDir, `logo${i}.png`);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Job.deleteMany();
    copyPlaceholderLogos();

    await Job.insertMany(jobs);
    console.log(' Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(' Seeding Failed:', err);
    process.exit(1);
  }
};
importData();
