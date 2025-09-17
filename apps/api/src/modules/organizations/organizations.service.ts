import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Organization, OrganizationMember, Prisma, MemberRole } from '@prisma/client';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

type OrganizationWithMembers = Organization & {
  members: (OrganizationMember & {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  })[];
  _count: {
    members: number;
    branches: number;
    contracts: number;
  };
};

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto, ownerId: string): Promise<OrganizationWithMembers> {
    // Verifica se CNPJ já existe
    const existingOrg = await this.prisma.organization.findUnique({
      where: { cnpj: createOrganizationDto.cnpj }
    });

    if (existingOrg) {
      throw new ConflictException('Organization with this CNPJ already exists');
    }

    // Cria organização e adiciona o criador como OWNER
    const organization = await this.prisma.organization.create({
      data: {
        ...createOrganizationDto,
        members: {
          create: {
            userId: ownerId,
            role: MemberRole.OWNER
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        _count: {
          select: {
            members: true,
            branches: true,
            contracts: true
          }
        }
      }
    });

    return organization;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput;
  } = {}): Promise<{ organizations: OrganizationWithMembers[]; total: number }> {
    const { skip = 0, take = 10, where, orderBy } = params;

    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          _count: {
            select: {
              members: true,
              branches: true,
              contracts: true
            }
          }
        }
      }),
      this.prisma.organization.count({ where })
    ]);

    return { organizations, total };
  }

  async findOne(id: string): Promise<OrganizationWithMembers> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                cpf: true,
                cnpj: true,
                role: true
              }
            }
          },
          orderBy: {
            joinedAt: 'asc'
          }
        },
        branches: true,
        _count: {
          select: {
            members: true,
            branches: true,
            contracts: true
          }
        }
      }
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto, userId: string): Promise<OrganizationWithMembers> {
    // Verifica se usuário tem permissão (OWNER ou ADMIN)
    await this.checkPermission(id, userId, [MemberRole.OWNER, MemberRole.ADMIN]);

    const updatedOrganization = await this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        _count: {
          select: {
            members: true,
            branches: true,
            contracts: true
          }
        }
      }
    });

    return updatedOrganization;
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    // Apenas OWNER pode deletar organização
    await this.checkPermission(id, userId, [MemberRole.OWNER]);

    await this.prisma.organization.delete({
      where: { id }
    });

    return { message: 'Organization deleted successfully' };
  }

  // Gestão de membros
  async addMember(organizationId: string, userIdToAdd: string, role: MemberRole, adminUserId: string): Promise<OrganizationMember> {
    // Verifica se usuário tem permissão para adicionar membros
    await this.checkPermission(organizationId, adminUserId, [MemberRole.OWNER, MemberRole.ADMIN]);

    // Verifica se usuário já é membro
    const existingMember = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: userIdToAdd,
          organizationId
        }
      }
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this organization');
    }

    const member = await this.prisma.organizationMember.create({
      data: {
        userId: userIdToAdd,
        organizationId,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return member;
  }

  async removeMember(organizationId: string, userIdToRemove: string, adminUserId: string): Promise<{ message: string }> {
    // Verifica se usuário tem permissão
    await this.checkPermission(organizationId, adminUserId, [MemberRole.OWNER, MemberRole.ADMIN]);

    // Não pode remover o OWNER
    const memberToRemove = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: userIdToRemove,
          organizationId
        }
      }
    });

    if (!memberToRemove) {
      throw new NotFoundException('Member not found in this organization');
    }

    if (memberToRemove.role === MemberRole.OWNER) {
      throw new ForbiddenException('Cannot remove organization owner');
    }

    await this.prisma.organizationMember.delete({
      where: {
        userId_organizationId: {
          userId: userIdToRemove,
          organizationId
        }
      }
    });

    return { message: 'Member removed successfully' };
  }

  async getUserOrganizations(userId: string): Promise<OrganizationWithMembers[]> {
    const memberships = await this.prisma.organizationMember.findMany({
      where: { userId },
      include: {
        organization: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true
                  }
                }
              }
            },
            _count: {
              select: {
                members: true,
                branches: true,
                contracts: true
              }
            }
          }
        }
      }
    });

    return memberships.map(membership => membership.organization);
  }

  private async checkPermission(organizationId: string, userId: string, allowedRoles: MemberRole[]): Promise<void> {
    const member = await this.prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId
        }
      }
    });

    if (!member || !allowedRoles.includes(member.role)) {
      throw new ForbiddenException('Insufficient permissions for this operation');
    }
  }
}
