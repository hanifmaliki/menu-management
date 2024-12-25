import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MenuService', () => {
  let service: MenuService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: PrismaService,
          useValue: {
            menu: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      const mockMenus = [
        { id: '1', name: 'Menu 1', depth: 0 },
        { id: '2', name: 'Menu 2', depth: 1 },
      ];
      jest.spyOn(prisma.menu, 'findMany').mockResolvedValue(mockMenus);

      const result = await service.getMenus();
      expect(result).toEqual(mockMenus);
      expect(prisma.menu.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a menu by ID', async () => {
      const mockMenu = { id: '1', name: 'Menu 1', depth: 0 };
      jest.spyOn(prisma.menu, 'findUnique').mockResolvedValue(mockMenu);

      const result = await service.getMenuById('1');
      expect(result).toEqual(mockMenu);
      expect(prisma.menu.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create a menu', async () => {
      const newMenu = { name: 'Menu 1', depth: 0, parentId: null };
      const createdMenu = { id: '1', ...newMenu };
      jest.spyOn(prisma.menu, 'create').mockResolvedValue(createdMenu);

      const result = await service.createMenu(newMenu);
      expect(result).toEqual(createdMenu);
      expect(prisma.menu.create).toHaveBeenCalledWith({ data: newMenu });
    });
  });

  describe('update', () => {
    it('should update a menu', async () => {
      const updateData = { name: 'Updated Menu', depth: 1 };
      const updatedMenu = { id: '1', ...updateData };
      jest.spyOn(prisma.menu, 'update').mockResolvedValue(updatedMenu);

      const result = await service.updateMenu('1', updateData);
      expect(result).toEqual(updatedMenu);
      expect(prisma.menu.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });
  });

  describe('delete', () => {
    it('should delete a menu', async () => {
      const deletedMenu = { id: '1', name: 'Menu 1', depth: 0 };
      jest.spyOn(prisma.menu, 'delete').mockResolvedValue(deletedMenu);

      const result = await service.deleteMenu('1');
      expect(result).toEqual(deletedMenu);
      expect(prisma.menu.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});