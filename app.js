import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';
import { sequelize } from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});