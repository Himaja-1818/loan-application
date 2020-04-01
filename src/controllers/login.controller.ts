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
import {Login} from '../models';
import {LoginRepository} from '../repositories';

export class LoginController {
  constructor(
    @repository(LoginRepository)
    public loginRepository : LoginRepository,
  ) {}

  @post('/logins', {
    responses: {
      '200': {
        description: 'Login model instance',
        content: {'application/json': {schema: getModelSchemaRef(Login)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {
            title: 'NewLogin',
            exclude: ['id'],
          }),
        },
      },
    })
    login: Omit<Login, 'id'>,
  ): Promise<Login> {
    return this.loginRepository.create(login);
  }

  @get('/logins/count', {
    responses: {
      '200': {
        description: 'Login model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.count(where);
  }

  @get('/logins', {
    responses: {
      '200': {
        description: 'Array of Login model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Login, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Login) filter?: Filter<Login>,
  ): Promise<Login[]> {
    return this.loginRepository.find(filter);
  }

  @patch('/logins', {
    responses: {
      '200': {
        description: 'Login PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
    @param.where(Login) where?: Where<Login>,
  ): Promise<Count> {
    return this.loginRepository.updateAll(login, where);
  }

  @get('/logins/{id}', {
    responses: {
      '200': {
        description: 'Login model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Login, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Login, {exclude: 'where'}) filter?: FilterExcludingWhere<Login>
  ): Promise<Login> {
    return this.loginRepository.findById(id, filter);
  }

  @patch('/logins/{id}', {
    responses: {
      '204': {
        description: 'Login PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Login, {partial: true}),
        },
      },
    })
    login: Login,
  ): Promise<void> {
    await this.loginRepository.updateById(id, login);
  }

  @put('/logins/{id}', {
    responses: {
      '204': {
        description: 'Login PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() login: Login,
  ): Promise<void> {
    await this.loginRepository.replaceById(id, login);
  }

  @del('/logins/{id}', {
    responses: {
      '204': {
        description: 'Login DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.loginRepository.deleteById(id);
  }
}
