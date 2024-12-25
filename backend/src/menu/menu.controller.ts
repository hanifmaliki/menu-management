import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus() {
    return this.menuService.getMenus();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Post()
  async createMenu(@Body() body: { name: string; depth: number; parentId?: string }) {
    return this.menuService.createMenu(body);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: string, @Body() body: { name?: string; depth?: number; parentId?: string }) {
    return this.menuService.updateMenu(id, body);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}