import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studRoutes from './routes/StudRoute.js'; 
import teachRoutes from './routes/TeachRoute.js'
import repRoutes from './routes/ReportRoute.js'
import emailRoutes from './routes/EmailRoute.js'

dotenv.config();

const app = express();
const port = 4000;


app.use(cors({
    origin: 'https://trackeasy500075.onrender.com',
    credentials: true // Enable this if you're using cookies or authorization headers
  }));
app.use(express.json());
app.use(express.urlencoded({ limit: "40kb", extended: true }));   
app.use("/api/v1/studs", studRoutes);
app.use("/api/v1/teach", teachRoutes);
app.use("/api/v1/attend", repRoutes);
app.use("/api/v1/email",emailRoutes);

mongoose.connect(process.env.MONGO_URL, {
    
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
