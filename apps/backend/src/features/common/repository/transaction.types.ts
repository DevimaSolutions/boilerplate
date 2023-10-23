import { ValueOf } from '../types';

/**
 * Enumeration that represents transaction isolation levels for use with the {@link useTransaction} function
 */
export const IsolationLevel = {
  /**
   * A constant indicating that dirty reads, non-repeatable reads and phantom reads can occur.
   */
  ReadUncommitted: 'READ UNCOMMITTED',
  /**
   * A constant indicating that dirty reads are prevented; non-repeatable reads and phantom reads can occur.
   */
  ReadCommitted: 'READ COMMITTED',
  /**
   * A constant indicating that dirty reads and non-repeatable reads are prevented; phantom reads can occur.
   */
  RepeatableRead: 'REPEATABLE READ',
  /**
   * A constant indicating that dirty reads, non-repeatable reads and phantom reads are prevented.
   */
  Serializable: 'SERIALIZABLE',
} as const;

/**
 * Enumeration that represents transaction propagation behaviors for use with the see {@link useTransaction} annotation
 */
export const Propagation = {
  /**
   * Support a current transaction, throw an exception if none exists.
   */
  Mandatory: 'MANDATORY',
  /**
   * Execute within a nested transaction if a current transaction exists, behave like `REQUIRED` else.
   */
  Nested: 'NESTED',
  /**
   * Execute non-transactionally, throw an exception if a transaction exists.
   */
  Never: 'NEVER',
  /**
   * Execute non-transactionally, suspend the current transaction if one exists.
   */
  NotSupported: 'NOT_SUPPORTED',
  /**
   * Support a current transaction, create a new one if none exists.
   */
  Required: 'REQUIRED',
  /**
   * Create a new transaction, and suspend the current transaction if one exists.
   */
  RequiresNew: 'REQUIRES_NEW',
  /**
   * Support a current transaction, execute non-transactionally if none exists.
   */
  Supports: 'SUPPORTS',
} as const;

export type IsolationLevel = typeof IsolationLevel;
export type Propagation = typeof Propagation;

export interface TransactionOptions {
  /**
   * @see {@link Propagation}
   */
  propagation?: ValueOf<Propagation>;
  /**
   * @see {@link IsolationLevel}
   */
  isolationLevel?: ValueOf<IsolationLevel>;
}
