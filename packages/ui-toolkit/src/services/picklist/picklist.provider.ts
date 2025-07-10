import type { Picklist } from './picklist.entity';

export interface PicklistProvider {
  getPicklist(picklistName: string, params?: Record<string, unknown>): Promise<Picklist[]>;
}
