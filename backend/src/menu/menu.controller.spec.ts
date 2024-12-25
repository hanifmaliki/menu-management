import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

describe('MenuController', () => {
  let controller: MenuController;
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MenuController>(MenuController);
    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      const mockMenus = [
        { id: '1', name: 'Menu 1', depth: 0 },
        { id: '2', name: 'Menu 2', depth: 1 },
      ];
      jest.spyOn(service, 'getMenus').mockResolvedValue(mockMenus);

      const result = await controller.getMenus();
      expect(result).toEqual(mockMenus);
      expect(service.getMenus).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a menu by ID', async () => {
      const mockMenu = { id: '1', name: 'Menu 1', depth: 0 };
      jest.spyOn(service, 'getMenuById').mockResolvedValue(mockMenu);

      const result = await controller.getMenuById('1');
      expect(result).toEqual(mockMenu);
      expect(service.getMenuById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a menu', async () => {
      const newMenu = { name: 'Menu 1', depth: 0, parentId: null };
      const createdMenu = { id: '1', ...newMenu };
      jest.spyOn(service, 'createMenu').mockResolvedValue(createdMenu);

      const result = await controller.createMenu(newMenu);
      expect(result).toEqual(createdMenu);
      expect(service.createMenu).toHaveBeenCalledWith(newMenu);
    });
  });

  describe('update', () => {
    it('should update a menu', async () => {
      const updateData = { name: 'Updated Menu', depth: 1 };
      const updatedMenu = { id: '1', ...updateData };
      jest.spyOn(service, 'updateMenu').mockResolvedValue(updatedMenu);

      const result = await controller.updateMenu('1', updateData);
      expect(result).toEqual(updatedMenu);
      expect(service.updateMenu).toHaveBeenCalledWith('1', updateData);
    });
  });

  describe('delete', () => {
    it('should delete a menu', async () => {
      const deletedMenu = { id: '1', name: 'Menu 1', depth: 0 };
      jest.spyOn(service, 'deleteMenu').mockResolvedValue(deletedMenu);

      const result = await controller.deleteMenu('1');
      expect(result).toEqual(deletedMenu);
      expect(service.deleteMenu).toHaveBeenCalledWith('1');
    });
  });
});