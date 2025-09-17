import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';
import { MemberRole } from '@prisma/client';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Organization created successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'CNPJ already exists' })
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    // TODO: Pegar userId do token JWT quando implementarmos auth
    const ownerId = '9fdefec8-3adc-4603-aa8b-68ca21eba1cd'; // User admin criado antes
    return this.organizationsService.create(createOrganizationDto, ownerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Organizations retrieved successfully' })
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { cnpj: { contains: search } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { city: { contains: search, mode: 'insensitive' as const } },
        { state: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const result = await this.organizationsService.findAll({
      skip,
      take: limitNumber,
      where,
      orderBy: { createdAt: 'desc' }
    });

    return {
      ...result,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: result.total,
        pages: Math.ceil(result.total / limitNumber)
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Organization retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Organization not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Organization updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Organization not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    // TODO: Pegar userId do token JWT
    const userId = '9fdefec8-3adc-4603-aa8b-68ca21eba1cd';
    return this.organizationsService.update(id, updateOrganizationDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Organization deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Organization not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Only organization owner can delete' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    // TODO: Pegar userId do token JWT  
    const userId = '9fdefec8-3adc-4603-aa8b-68ca21eba1cd';
    return this.organizationsService.remove(id, userId);
  }

  // Gestão de membros
  @Post(':id/members')
  @ApiOperation({ summary: 'Add member to organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Member added successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User is already a member' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' })
  async addMember(
    @Param('id', ParseUUIDPipe) organizationId: string,
    @Body() body: { userId: string; role: MemberRole }
  ) {
    // TODO: Pegar adminUserId do token JWT
    const adminUserId = '9fdefec8-3adc-4603-aa8b-68ca21eba1cd';
    return this.organizationsService.addMember(organizationId, body.userId, body.role, adminUserId);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove member from organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiParam({ name: 'userId', description: 'User ID to remove' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Member removed successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Member not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Cannot remove owner or insufficient permissions' })
  async removeMember(
    @Param('id', ParseUUIDPipe) organizationId: string,
    @Param('userId', ParseUUIDPipe) userIdToRemove: string
  ) {
    // TODO: Pegar adminUserId do token JWT
    const adminUserId = '9fdefec8-3adc-4603-aa8b-68ca21eba1cd';
    return this.organizationsService.removeMember(organizationId, userIdToRemove, adminUserId);
  }

  @Get('users/:userId/organizations')
  @ApiOperation({ summary: 'Get user organizations' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User organizations retrieved successfully' })
  async getUserOrganizations(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.organizationsService.getUserOrganizations(userId);
  }
}
