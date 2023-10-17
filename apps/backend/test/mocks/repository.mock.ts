import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { ValueProvider } from '@nestjs/common';
import type { ObjectLiteral } from 'typeorm';

export const createRepositoryMock = <TEntity extends ObjectLiteral>() => {
  const repositoryMock = Object.getOwnPropertyNames(Repository.prototype).reduce<ObjectLiteral>(
    (acc, x) => {
      acc[x] = jest.fn();
      return acc;
    },
    {},
  ) as Repository<TEntity>;
  return repositoryMock;
};

export const createMockedRepositoryProvider = <TEntity extends ObjectLiteral>(
  Entity: new () => TEntity,
): ValueProvider => ({
  provide: getRepositoryToken(Entity),
  useValue: createRepositoryMock<TEntity>(),
});
