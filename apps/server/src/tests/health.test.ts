import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/core/app';

describe('Health Route', () => {
  it('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
