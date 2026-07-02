import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateCategoryUseCase } from '../../../uses-cases/factory/make-create-category-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
  })

  const { name } = registerBodySchema.parse(request.body)

  const createCategoryUseCase = makeCreateCategoryUseCase()
  await createCategoryUseCase.handler(name)

  return reply.status(201).send()
}
