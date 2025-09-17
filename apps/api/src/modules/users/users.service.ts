import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { password, ...userData } = createUserDto;

    // Verifica se já existe usuário com email, cpf ou cnpj
    const whereConditions: Prisma.UserWhereInput[] = [
      { email: userData.email }
    ];
    
    if (userData.cpf) {
      whereConditions.push({ cpf: userData.cpf });
    }
    
    if (userData.cnpj) {
      whereConditions.push({ cnpj: userData.cnpj });
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: whereConditions
      }
    });

    if (existingUser) {
      throw new ConflictException('User with this email, CPF or CNPJ already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: userData.role || 'USER',
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  } = {}): Promise<{ users: Omit<User, 'password'>[]; total: number }> {
    const { skip = 0, take = 10, where, orderBy } = params;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          cpf: true,
          cnpj: true,
          role: true,
          isActive: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        }
      }),
      this.prisma.user.count({ where })
    ]);

    return { users, total };
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        cpf: true,
        cnpj: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Verifica conflitos de email, cpf ou cnpj
    const whereConditions: Prisma.UserWhereInput[] = [];
    
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      whereConditions.push({ email: updateUserDto.email });
    }
    
    if (updateUserDto.cpf && updateUserDto.cpf !== existingUser.cpf) {
      whereConditions.push({ cpf: updateUserDto.cpf });
    }
    
    if (updateUserDto.cnpj && updateUserDto.cnpj !== existingUser.cnpj) {
      whereConditions.push({ cnpj: updateUserDto.cnpj });
    }

    if (whereConditions.length > 0) {
      const conflictUser = await this.prisma.user.findFirst({
        where: {
          OR: whereConditions,
          id: { not: id }
        }
      });

      if (conflictUser) {
        throw new ConflictException('Email, CPF or CNPJ already exists');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        cpf: true,
        cnpj: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return updatedUser;
  }

  async remove(id: string): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id }
    });

    return { message: 'User deleted successfully' };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
