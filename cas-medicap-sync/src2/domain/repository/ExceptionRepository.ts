import { Exception } from '../schema/Exception'

export interface ExceptionRepository {
  create(exception: Exception): Promise<void>
  update(exception: Exception): Promise<void>
  findById(exceptionId: string): Promise<Exception | null>
}
