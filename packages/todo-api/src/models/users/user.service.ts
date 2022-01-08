import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/postgres/prisma.sevice';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prisma.user.update(params);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }

  async changePassword(params: {
    where: Prisma.UserWhereUniqueInput;
    data: string;
  }): Promise<User> {
    const hashed = await hash(params.data, 10);
    return this.updateUser({
      where: params.where,
      data: { passwordHash: hashed },
    });
  }
}
