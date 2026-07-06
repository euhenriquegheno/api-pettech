import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeSigninUseCase } from '../../../uses-cases/factory/make-signin-use-case'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../../../uses-cases/errors/invalid-credentials-error'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const signinUseCase = makeSigninUseCase()
  const user = await signinUseCase.handler(username)
  const doesntPasswordMatch = await compare(password, user.password)

  if (!doesntPasswordMatch) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({ username: user.username })

  return reply.status(200).send({
    token,
  })
}
