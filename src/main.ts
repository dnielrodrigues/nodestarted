import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Aspec Authentication')
    .setDescription('Serviço de autenticação multi-plataforma Aspec.')
    .setVersion('1.0')
    .addTag('aspec')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
