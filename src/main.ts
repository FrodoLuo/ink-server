import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useStaticAssets(__dirname + '/public');
  app.useStaticAssets('data', {prefix: '/data/'});
  await app.listen(5000);
}
bootstrap();
