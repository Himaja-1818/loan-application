import {Entity, model, property} from '@loopback/repository';

@model()
export class Details extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  address: object;

  @property({
    type: 'string',
    required: true,
  })
  pan_number: string;

  @property({
    type: 'number',
    required: true,
  })
  loan_amount: number;

  @property({
    type: 'string',
    required: true,
  })
  Reason: string;

  @property({
    type: 'string',
    required: true,
  })
  company_details: string;


  constructor(data?: Partial<Details>) {
    super(data);
  }
}

export interface DetailsRelations {
  // describe navigational properties here
}

export type DetailsWithRelations = Details & DetailsRelations;
