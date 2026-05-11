import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
export declare class MaterialsService {
    private readonly repository;
    constructor(repository: Repository<Material>);
    create(createMaterialDto: CreateMaterialDto): string;
    findAll(): Promise<Material[]>;
    findOne(id: number): string;
    update(id: number, updateMaterialDto: UpdateMaterialDto): string;
    remove(id: number): string;
}
