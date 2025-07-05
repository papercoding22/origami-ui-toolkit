import express from 'express';
import healthRoutes from '@/api/health';

const app = express();
app.use(express.json());

app.use('/api/health', healthRoutes);

export default app;
