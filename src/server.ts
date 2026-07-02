// Onde expoem as configurações do servidor web
import { env } from './env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on http://localhost:' + env.PORT)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
