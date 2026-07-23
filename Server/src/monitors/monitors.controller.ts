import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/supabase-auth.guard';
import {
  assertValidCreateMonitorDto,
  type CreateMonitorDto,
} from './dto/create-monitor.dto';

// Todas as rotas exigem um usuário autenticado (Bearer token do Supabase).
// A organização nunca vem do cliente — é sempre resolvida a partir do
// usuário autenticado, evitando acesso a dados de outras contas (IDOR).
@Controller('monitors')
@UseGuards(SupabaseAuthGuard)
export class MonitorsController {
  constructor(
    private readonly monitorsService: MonitorsService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Get()
  async findAll(@CurrentUser() user: AuthenticatedUser) {
    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.findAll(organizationId);
  }

  @Get('stats')
  async stats(@CurrentUser() user: AuthenticatedUser) {
    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.stats(organizationId);
  }

  @Get('activity')
  async activity(@CurrentUser() user: AuthenticatedUser) {
    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.recentActivity(organizationId);
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.findOne(organizationId, id);
  }

  @Post()
  async create(@CurrentUser() user: AuthenticatedUser, @Body() body: unknown) {
    try {
      assertValidCreateMonitorDto(body);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.create(organizationId, body as CreateMonitorDto);
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    const organizationId =
      await this.organizationsService.resolveOrganizationId(user);
    return this.monitorsService.remove(organizationId, id);
  }
}
