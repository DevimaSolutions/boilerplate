import { createNamespace, getNamespace } from 'cls-hooked';

import type { Namespace } from 'cls-hooked';
import type { EventEmitter } from 'node:events';
import type { EntityManager, ObjectLiteral, Repository } from 'typeorm';

export const NAMESPACE_NAME = '__typeOrm___cls_hooked_tx_namespace';

const TYPE_ORM_ENTITY_MANAGER_KEY = '__typeOrm__transactionalEntityManager';
const TYPE_ORM_HOOK_KEY = '__typeOrm__transactionalCommitHooks';

export interface TransactionalContext {
  __typeOrm__transactionalEntityManager: EntityManager | null;
  __typeOrm__transactionalCommitHooks: EventEmitter | null;
}

/**
 * Create or return cls namespace where transactional entity manager is stored.
 * This method should be called before TypeORM module is initialized.
 */
export const initializeTransactionalContext = () => {
  return (
    getNamespace<TransactionalContext>(NAMESPACE_NAME) ||
    createNamespace<TransactionalContext>(NAMESPACE_NAME)
  );
};

export const setEntityManager = (
  context: Namespace<TransactionalContext>,
  entityManager: EntityManager | null,
) => context.set(TYPE_ORM_ENTITY_MANAGER_KEY, entityManager);

export const getHookInContext = (
  context: Namespace<TransactionalContext> | undefined,
): EventEmitter | null => {
  return context?.get(TYPE_ORM_HOOK_KEY) ?? null;
};

export const setHookInContext = (
  context: Namespace<TransactionalContext>,
  emitter: EventEmitter | null,
) => {
  return context.set(TYPE_ORM_HOOK_KEY, emitter);
};

export const getEntityManager = (
  context: Namespace<TransactionalContext>,
): EntityManager | null => {
  return context.get(TYPE_ORM_ENTITY_MANAGER_KEY);
};

export const getEntityManagerOrTransactionManager = (
  entityManager: EntityManager | undefined,
): EntityManager | undefined => {
  const context = getNamespace<TransactionalContext>(NAMESPACE_NAME);

  if (context?.active) {
    // return entityManager from transaction context if this context exist
    // otherwise return default entity manager
    return getEntityManager(context) || entityManager;
  }
  return entityManager;
};

/**
 * @param repositoryType - repository class where the `manager` property will be patched
 * to support cls-hooked namespaces
 */
export const patchRepositoryManager = <TEntity extends ObjectLiteral>(
  repositoryType: Repository<TEntity>,
) => {
  Object.defineProperty(repositoryType, 'manager', {
    get() {
      const repository = this as Repository<TEntity> & { _manager: EntityManager | undefined };
      return getEntityManagerOrTransactionManager(repository._manager);
    },
    set(manager: EntityManager | undefined) {
      (this as Repository<TEntity> & { _manager: EntityManager | undefined })._manager = manager;
    },
  });
};
