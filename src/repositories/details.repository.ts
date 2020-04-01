import {DefaultCrudRepository} from '@loopback/repository';
import {Details, DetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DetailsRepository extends DefaultCrudRepository<
  Details,
  typeof Details.prototype.id,
  DetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Details, dataSource);
  }
}
