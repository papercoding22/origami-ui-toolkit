import { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

export const products: Product[] = [
  {
    id: uuidv4(),
    name: 'Awesome Jacket',
    price: 99.99,
    description: 'A stylish jacket for your ride.',
  },
  {
    id: uuidv4(),
    name: 'Rider Helmet',
    price: 120.0,
    description: 'Protects your head and looks cool.',
  },
  // Generate 10 more products with random data
  {
    id: uuidv4(),
    name: 'Trail Boots',
    price: 79.5,
    description: 'Durable boots for all terrains.',
  },
  {
    id: uuidv4(),
    name: 'Cyclist Gloves',
    price: 25.99,
    description: 'Comfortable gloves for long rides.',
  },
  {
    id: uuidv4(),
    name: 'Windbreaker Vest',
    price: 45.0,
    description: 'Lightweight vest for windy days.',
  },
  {
    id: uuidv4(),
    name: 'Reflective Backpack',
    price: 60.75,
    description: 'Stay visible and carry your gear.',
  },
  {
    id: uuidv4(),
    name: 'Sports Sunglasses',
    price: 35.2,
    description: 'Protect your eyes from sun and wind.',
  },
  {
    id: uuidv4(),
    name: 'Water Bottle',
    price: 12.5,
    description: 'Stay hydrated on the go.',
  },
  {
    id: uuidv4(),
    name: 'Bike Lock',
    price: 29.99,
    description: 'Secure your bike anywhere.',
  },
  {
    id: uuidv4(),
    name: 'LED Headlight',
    price: 18.0,
    description: 'Bright LED headlight for night rides.',
  },
  {
    id: uuidv4(),
    name: 'Chain Lubricant',
    price: 8.99,
    description: 'Keep your bike chain running smooth.',
  },
  {
    id: uuidv4(),
    name: 'Multi-tool Kit',
    price: 22.49,
    description: 'All-in-one tool kit for quick repairs.',
  },
];
