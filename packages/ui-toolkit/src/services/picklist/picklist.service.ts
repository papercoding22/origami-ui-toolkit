import type { Picklist } from './picklist.entity';
import type { PicklistProvider } from './picklist.provider';

export class PicklistService {
  private picklistProvider: PicklistProvider;

  constructor(picklistProvider: PicklistProvider) {
    this.picklistProvider = picklistProvider;
  }

  async getPicklist(picklistName: string, params?: Record<string, unknown>): Promise<Picklist[]> {
    return this.picklistProvider.getPicklist(picklistName, params);
  }
}
