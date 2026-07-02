import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeFindProductUseCase } from '../../../uses-cases/factory/make-find-product-user-case'

export async function findProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = registerParamsSchema.parse(request.params)
  const findProductUseCase = makeFindProductUseCase()

  const product = await findProductUseCase.handler(id)

  return reply.status(200).send(product)
}
