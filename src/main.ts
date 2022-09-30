import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const GRAPHQL_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL is now running on: http://localhost:${GRAPHQL_PORT}/graphql`
  ));
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
