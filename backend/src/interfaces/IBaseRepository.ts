export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
}