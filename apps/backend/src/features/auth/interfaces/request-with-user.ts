import { Request } from 'express';

import { User } from 'src/features/users/entities/user.entity';

import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

export interface RequestWithUser<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
  Locals extends Record<string, unknown> = Record<string, unknown>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user: User;
}

export interface RequestWithOptionalUser<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
  Locals extends Record<string, unknown> = Record<string, unknown>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
}
