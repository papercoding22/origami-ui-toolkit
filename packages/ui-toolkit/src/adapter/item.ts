export interface ItemAdapter {
  fetchItems: <T>(itemName: string, filter?: string) => Promise<T[]>;
}
