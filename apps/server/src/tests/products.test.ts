import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/core/app';

describe('Products API', () => {
  it('GET /api/products should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('POST /api/products should create a product', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Gloves', price: 29.99 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Gloves');
  });
});
