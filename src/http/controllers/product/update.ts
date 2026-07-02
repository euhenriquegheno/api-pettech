import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdateProductUseCase } from '../../../uses-cases/factory/make-update-product-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    categories: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      )
      .optional(),
  })

  const { name, description, image, price, categories } =
    registerBodySchema.parse(request.body)

  const updateProductUseCase = makeUpdateProductUseCase()
  const product = await updateProductUseCase.handler({
    id,
    name,
    description,
    image,
    price,
    categories: categories || [],
  })

  return reply.status(200).send(product)
}
