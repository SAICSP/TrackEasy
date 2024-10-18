import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studRoutes from './routes/StudRoute.js'; 
import teachRoutes from './routes/TeachRoute.js'
// import whatsappRoute from './routes/WhatsappRoute.js'
dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "40kb", extended: true }));   
app.use("/api/v1/studs", studRoutes);
app.use("/api/v1/teach", teachRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
