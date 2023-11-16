export interface OperationResult<T> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
  }