"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../teacher/users/entities/user.entity");
let AssignmentsService = class AssignmentsService {
    constructor(Repository, userRepository) {
        this.Repository = Repository;
        this.userRepository = userRepository;
    }
    async create(userId, createAssignmentDto) {
        return await this.Repository.create({ userId, ...createAssignmentDto });
    }
    async withpaginatingsections(userId, offset, limit) {
        return await this.Repository.find({ where: { userId }, skip: offset, take: limit, });
    }
    async uploadFile(id, file, createassignmentDTO) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file uploaded');
            }
            const user = await this.userRepository.findOne({ where: { id }, relations: ['assignment']
            });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            user.assigcardimg = file.path;
            const newAssignment = await this.Repository.create({
                assigcardimg: file.path,
                name: createassignmentDTO.name,
                degree: createassignmentDTO.degree,
                lastdate: createassignmentDTO.lastdate,
                price: createassignmentDTO.price,
                questions: createassignmentDTO.questions,
                startdate: createassignmentDTO.startdate,
                userId: user,
            });
            await this.Repository.save(newAssignment);
            user.assignment.push(newAssignment);
            return {
                message: 'File uploaded successfully',
                imagePath: user.cardimg,
                assignment: newAssignment,
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    findAll(userId) {
        return this.Repository.find(userId);
    }
    allassignments(userId) {
        return this.Repository.find(userId);
    }
    findOne(id) {
        return `This action returns a #${id} assignment`;
    }
    update(id, updateAssignmentDto) {
        return `This action updates a #${id} assignment`;
    }
    remove(id) {
        return `This action removes a #${id} assignment`;
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map