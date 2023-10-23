import { InjectionToken } from '@nestjs/common';
import { ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const isConstructable = <T = unknown>(
  value: T | (new (...args: unknown[]) => unknown),
): value is new (...args: unknown[]) => unknown => {
  if (typeof value !== 'function') {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types -- Value is intended to be any function-like value including class declarations
  const prototype = value.prototype as Function | undefined;
  const startsWithClass = prototype?.constructor.toString().startsWith('class');
  return startsWithClass || false;
};

export const mockFactory = (token?: InjectionToken) => {
  if (!token) {
    throw new Error(`Failed to get module metadata: No token provided`);
  }
  // Mock all dependencies of the Auth service
  const mockMetadata = moduleMocker.getMetadata(token);
  if (!mockMetadata) {
    throw new Error(`Failed to get module metadata: ${token.toString()}`);
  }

  const Mock = moduleMocker.generateFromMetadata(mockMetadata);

  try {
    if (isConstructable<typeof Mock>(Mock)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Mock can have any type provided by jest-mock
      return new Mock();
    }

    return Mock;
  } catch (err) {
    // return Mock if error was thrown (This was not a class)
    if (err instanceof Error && err.message.includes('is not a constructor')) {
      return Mock;
    }

    throw err;
  }
};
