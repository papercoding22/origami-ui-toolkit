import { BaseEntity } from '../../shared';

export class Picklist extends BaseEntity {
  // The Picklist class extends BaseEntity, inheriting its properties and methods.
  // It can have additional properties or methods specific to picklists if needed.

  constructor(id: string | number, name: string, description?: string) {
    super(id, name, description);
    // Call the constructor of BaseEntity to initialize common properties.
  }
}
