import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT =Number(process.env.SERVER_PORT);
  await app.listen(PORT,()=>{
    console.log(`Server running in the port:  ${PORT}`);
  });
}
bootstrap();
