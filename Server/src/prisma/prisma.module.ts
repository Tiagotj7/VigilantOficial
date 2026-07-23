import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() para não precisar importar o PrismaModule em cada feature module.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
