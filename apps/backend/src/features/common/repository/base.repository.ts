import { getNamespace } from 'cls-hooked';
import { Repository } from 'typeorm';

import { runInNewHookContext } from './cls-hooks';
import { Propagation } from './transaction.types';
import {
  NAMESPACE_NAME,
  getEntityManager,
  patchRepositoryManager,
  setEntityManager,
} from './transaction.util';
import { TransactionalError } from './transactional-error';

import type { TransactionOptions } from './transaction.types';
import type { TransactionalContext } from './transaction.util';
import type { DataSource, EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
  constructor(
    target: EntityTarget<Entity>,
    protected dataSource: DataSource,
  ) {
    super(target, dataSource.createEntityManager());
  }

  /**
   * Execute all underlying code inside a single transaction using cls-hooked namespaces
   * @param transactionScopedFn - the function that will execute in a shared transaction context
   * @param options - transaction options. Default propagation type is "REQUIRED".
   * @returns returns result of `transactionScopedFn` call
   */
  useTransaction = async <TResult>(
    transactionScopedFn: () => Promise<TResult>,
    options?: TransactionOptions,
  ): Promise<TResult> => {
    const context = getNamespace<TransactionalContext>(NAMESPACE_NAME);
    if (!context) {
      throw new Error(
        'No CLS namespace defined in your app... please call initializeTransactionalContext() before application start.',
      );
    }

    const propagation = options?.propagation ?? Propagation.Required;
    // Use default isolation level provided by DB if not specified
    const isolationLevel = options?.isolationLevel;
    const isCurrentTransactionActive = this.queryRunner?.isTransactionActive;

    const operationId = String(new Date().getTime());
    const logger = this.dataSource.logger;
    const log = (message: string) => {
      logger.log(
        'log',
        `useTransaction@${operationId}|${isolationLevel}|${propagation} - ${message}`,
      );
    };

    log(`Before starting: isCurrentTransactionActive = ${isCurrentTransactionActive}`);

    const runOriginal = transactionScopedFn;
    const runWithNewHook = () => runInNewHookContext(context, transactionScopedFn);

    const runWithNewTransaction = async () => {
      const transactionCallback = async (entityManager: EntityManager) => {
        log(
          `runWithNewTransaction - set entityManager in context: isCurrentTransactionActive: ${entityManager.queryRunner?.isTransactionActive}`,
        );
        setEntityManager(context, entityManager);
        try {
          const result = await transactionScopedFn();
          log(`runWithNewTransaction - Success`);
          return result;
        } catch (e) {
          log(`runWithNewTransaction - ERROR|${e?.toString()}`);
          throw e;
        } finally {
          log(`runWithNewTransaction - reset entityManager in context`);
          setEntityManager(context, null);
        }
      };

      if (isolationLevel) {
        return (await runInNewHookContext(context, () =>
          this.manager.transaction(isolationLevel, transactionCallback),
        )) as TResult;
      }
      return (await runInNewHookContext(context, () =>
        this.manager.transaction(transactionCallback),
      )) as TResult;
    };

    return context.runAndReturn(async () => {
      const currentTransaction = getEntityManager(context);

      switch (propagation) {
        case Propagation.Mandatory:
          if (!currentTransaction) {
            throw new TransactionalError(
              "No existing transaction found for transaction marked with propagation 'MANDATORY'",
            );
          }
          return runOriginal();
        case Propagation.Nested:
          return runWithNewTransaction();
        case Propagation.Never:
          if (currentTransaction) {
            throw new TransactionalError(
              "Found an existing transaction, transaction marked with propagation 'NEVER'",
            );
          }
          return runWithNewHook();
        case Propagation.NotSupported:
          if (currentTransaction) {
            setEntityManager(context, null);
            const result = await runWithNewHook();
            setEntityManager(context, currentTransaction);
            return result;
          }
          return runOriginal();
        case Propagation.Required:
          if (currentTransaction) {
            return runOriginal();
          }
          return runWithNewTransaction();
        case Propagation.RequiresNew:
          return runWithNewTransaction();
        case Propagation.Supports:
          if (currentTransaction) {
            return runOriginal();
          }
          return runWithNewHook();
      }
    });
  };
}

patchRepositoryManager(BaseRepository.prototype);
