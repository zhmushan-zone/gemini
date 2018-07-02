export interface Service<T> {
  save: (...args) => Promise<T>;
  delete: (...args) => void;
  findById: (id: string) => Promise<T>;
  findAll: () => Promise<T[]>;
  updateById: (id: string, t: T) => void;
}
