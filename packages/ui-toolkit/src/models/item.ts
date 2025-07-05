import type { BaseModel } from './base-model';

export interface Item extends BaseModel {
  [key: string]: string | number | boolean | undefined;
  description?: string;
}
