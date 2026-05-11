import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/teacher/users/entities/user.entity';

@Injectable()
export class AssignmentsService {
  constructor(
   @InjectRepository(Assignment) private readonly Repository:Repository<Assignment> 
  ,@InjectRepository(User) private readonly userRepository:Repository<User>
  ){}
 async create(userId,createAssignmentDto: CreateAssignmentDto,) {
    return await this.Repository.create({userId,...createAssignmentDto});
  }

  async withpaginatingsections(userId,offset?:number,limit?:number ,){
    return  await this.Repository.find({where:{ userId},skip:offset,take:limit,})
    }
        async uploadFile(id: number, file: Express.Multer.File, createassignmentDTO: CreateAssignmentDto) {
          try {
            if (!file) {
              throw new BadRequestException('No file uploaded');
            }
        
            const user = await this.userRepository.findOne({ where: { id }, relations: ['assignment'] 
            });
            if (!user) {
              throw new ForbiddenException('User not found');
            }
        
            user.assigcardimg = file.path;
        
            const newAssignment =await this.Repository.create({
              assigcardimg:file.path , 
              name:createassignmentDTO.name,
                degree:createassignmentDTO.degree,
                lastdate:createassignmentDTO.lastdate,
                price :createassignmentDTO.price ,
           
                // totaldegree:createassignmentDTO.showDegreeafter ,
              questions:createassignmentDTO.questions
            //  , showDegreeBefore:createassignmentDTO.showDegreeBefore,
              ,startdate:createassignmentDTO.startdate,
              // showDegreeafter:createassignmentDTO.showDegreeafter,
             
              userId: user, });
        
            await this.Repository.save(newAssignment);
        
            user.assignment.push(newAssignment);
        
            // await this.userRepository.save(user);
        
            return { 
              message: 'File uploaded successfully', 
              imagePath: user.cardimg,
            assignment: newAssignment,
            };
          } catch (e) {
            console.error(e);
            throw new  BadRequestException('Failed to upload file');
          }
        }
  findAll(userId) {
    return this.Repository.find(userId);
  }
  allassignments(userId) {
    return this.Repository.find(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }



  
}
