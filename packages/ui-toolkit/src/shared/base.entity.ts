export class BaseEntity {
  id: string | number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  isActive?: boolean;

  constructor(id: string | number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}
