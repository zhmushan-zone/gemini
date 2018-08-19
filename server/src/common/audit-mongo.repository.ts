import { MongoRepository, UpdateResult, DeepPartial, SaveOptions, ObjectLiteral, ObjectID, FindConditions } from 'typeorm';

export abstract class AuditMongoRepository<Entity extends ObjectLiteral> extends MongoRepository<Entity> {
  async save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T> {
    const createdCol = this.metadata.createDateColumn ? this.metadata.createDateColumn.propertyPath : null;
    if (createdCol) {
      (entity as any)[createdCol] = new Date();
    }
    return super.save(entity, options);
  }

  async update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: DeepPartial<Entity>, options?: SaveOptions
  ): Promise<UpdateResult> {
    const updatedCol = this.metadata.updateDateColumn ? this.metadata.updateDateColumn.propertyPath : null;
    if (updatedCol) {
      (partialEntity as any)[updatedCol] = new Date();
    }
    return super.update(criteria, partialEntity, options);
  }
}
