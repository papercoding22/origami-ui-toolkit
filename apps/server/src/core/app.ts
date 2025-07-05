import express from 'express';
import healthRoutes from '@/api/health';
import productRoutes from '@/api/products';

const app = express();
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);

export default app;
