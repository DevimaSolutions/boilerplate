import type { ValueProvider } from '@nestjs/common';
import type { ObjectLiteral } from 'typeorm';

export const createServiceMock = <TService extends ObjectLiteral, TConstructorParams>(
  ServiceClass: new (...args: TConstructorParams[]) => TService,
) => {
  const serviceMock = Object.getOwnPropertyNames(ServiceClass.prototype).reduce<ObjectLiteral>(
    (acc, x) => {
      acc[x] = jest.fn();
      return acc;
    },
    {},
  ) as TService;
  return serviceMock;
};

export const createMockedServiceProvider = <TService extends ObjectLiteral, TConstructorParams>(
  ServiceClass: new (...args: TConstructorParams[]) => TService,
): ValueProvider => ({ provide: ServiceClass, useValue: createServiceMock(ServiceClass) });
