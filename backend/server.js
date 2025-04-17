import express from "express";
import path from 'path';
import jobRoutes from './routes/jobRoutes.js'; 
import connectDB from "./config/db.js";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);

// Serve static files in uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
else{
  app.get('/', (req, res) => {
    res.send('API is running...');
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});