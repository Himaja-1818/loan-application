import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Details} from '../models';
import {DetailsRepository} from '../repositories';

export class DetailsController {
  constructor(
    @repository(DetailsRepository)
    public detailsRepository : DetailsRepository,
  ) {}

  @post('/details', {
    responses: {
      '200': {
        description: 'Details model instance',
        content: {'application/json': {schema: getModelSchemaRef(Details)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Details, {
            title: 'NewDetails',
            exclude: ['id'],
          }),
        },
      },
    })
    details: Omit<Details, 'id'>,
  ): Promise<Details> {
    return this.detailsRepository.create(details);
  }

  @get('/details/count', {
    responses: {
      '200': {
        description: 'Details model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Details) where?: Where<Details>,
  ): Promise<Count> {
    return this.detailsRepository.count(where);
  }

  @get('/details', {
    responses: {
      '200': {
        description: 'Array of Details model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Details, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Details) filter?: Filter<Details>,
  ): Promise<Details[]> {
    return this.detailsRepository.find(filter);
  }

  @patch('/details', {
    responses: {
      '200': {
        description: 'Details PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Details, {partial: true}),
        },
      },
    })
    details: Details,
    @param.where(Details) where?: Where<Details>,
  ): Promise<Count> {
    return this.detailsRepository.updateAll(details, where);
  }

  @get('/details/{id}', {
    responses: {
      '200': {
        description: 'Details model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Details, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Details, {exclude: 'where'}) filter?: FilterExcludingWhere<Details>
  ): Promise<Details> {
    return this.detailsRepository.findById(id, filter);
  }

  @patch('/details/{id}', {
    responses: {
      '204': {
        description: 'Details PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Details, {partial: true}),
        },
      },
    })
    details: Details,
  ): Promise<void> {
    await this.detailsRepository.updateById(id, details);
  }

  @put('/details/{id}', {
    responses: {
      '204': {
        description: 'Details PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() details: Details,
  ): Promise<void> {
    await this.detailsRepository.replaceById(id, details);
  }

  @del('/details/{id}', {
    responses: {
      '204': {
        description: 'Details DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.detailsRepository.deleteById(id);
  }
}
