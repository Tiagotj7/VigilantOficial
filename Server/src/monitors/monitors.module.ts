import { Module } from '@nestjs/common';
import { MonitorsController } from './monitors.controller';
import { MonitorsService } from './monitors.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  controllers: [MonitorsController],
  providers: [MonitorsService],
})
export class MonitorsModule {}
