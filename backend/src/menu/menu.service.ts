import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus() {
    return this.prisma.menu.findMany({
      include: { children: true, parent: true },
    });
  }

  async getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  }

  async createMenu(data: { name: string; depth: number; parentId?: string }) {
    return this.prisma.menu.create({ data });
  }

  async updateMenu(id: string, data: { name?: string; depth?: number; parentId?: string }) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}