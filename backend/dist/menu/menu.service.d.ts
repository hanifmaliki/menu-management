import { PrismaService } from '../prisma/prisma.service';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
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
    createMenu(data: {
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
    updateMenu(id: string, data: {
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
