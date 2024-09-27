import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(err => {
        return `${err.property} : Not Valid | ${Object.values(err.constraints).join(', ')}`;
      });
      return new HttpException(messages, HttpStatus.BAD_REQUEST);
    },
    disableErrorMessages: false,
  }));

  await app.listen(3000);
}
bootstrap();