export interface ObjectData {
  id: string;
  name: string;
}

export interface ObjectAPI {
  fetchObjectData: <T>(objectName: string, filter?: string) => Promise<T[]>;
}
