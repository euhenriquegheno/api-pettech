import { UserRepository } from '../../repositories/pg/user.repository'
import { FindWithPersonUseCase } from '../find-with-person'

export function makeFindWithPersonUseCase() {
  const personRepository = new UserRepository()
  const findWithPersonUseCase = new FindWithPersonUseCase(personRepository)
  return findWithPersonUseCase
}
