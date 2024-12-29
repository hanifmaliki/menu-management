import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenus(): Promise<({
        parent: {
            id: string;
            name: string;
            depth: number;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: string;
            name: string;
            depth: number;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        depth: number;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getMenuById(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            depth: number;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: string;
            name: string;
            depth: number;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        depth: number;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMenu(body: {
        name: string;
        depth: number;
        parentId?: string;
    }): Promise<{
        id: string;
        name: string;
        depth: number;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMenu(id: string, body: {
        name?: string;
        depth?: number;
        parentId?: string;
    }): Promise<{
        id: string;
        name: string;
        depth: number;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMenu(id: string): Promise<{
        id: string;
        name: string;
        depth: number;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
