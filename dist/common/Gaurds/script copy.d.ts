import { ModulesContainer, Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
export declare class RolesSeeder2 {
    private readonly dataSource;
    private readonly modulesContainer;
    private readonly reflector;
    constructor(dataSource: DataSource, modulesContainer: ModulesContainer, reflector: Reflector);
    seed(): Promise<void>;
    private extractQueryKeys;
}
