import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/postgres/prisma.sevice';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async category(
    postWhereUniqueInput: Prisma.CategoryWhereUniqueInput
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: postWhereUniqueInput });
  }

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    return this.prisma.category.findMany(params);
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    return this.prisma.category.update(params);
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput
  ): Promise<Category> {
    return this.prisma.category.delete({ where });
  }
}
