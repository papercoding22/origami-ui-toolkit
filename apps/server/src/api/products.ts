import { Router } from 'express';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all products
router.get('/', (_req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct: Product = {
    id: uuidv4(),
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const updated = { ...products[index], ...req.body };
  products[index] = updated;
  res.json(updated);
});

// Delete a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products.splice(index, 1);
  res.status(204).end();
});

export default router;
