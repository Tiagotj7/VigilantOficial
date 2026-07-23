import { Controller, Get, Param, Query } from '@nestjs/common';
import { MonitorsService } from './monitors.service';

@Controller('monitors')
export class MonitorsController {
  constructor(private readonly monitorsService: MonitorsService) {}

  @Get()
  findAll(@Query('organizationId') organizationId: string) {
    return this.monitorsService.findAll(organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorsService.findOne(id);
  }
}
