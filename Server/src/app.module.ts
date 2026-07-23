import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MonitorsModule } from './monitors/monitors.module';

@Module({
  imports: [PrismaModule, MonitorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
