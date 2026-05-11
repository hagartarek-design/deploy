import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/teacher/images/entities/image.entity';
import { Section } from 'src/sections/entities/section.entity';
import { CreateSectionDto } from 'src/sections/dto/create-section.dto';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly user:Repository<User> 
   , @InjectRepository(Image) private readonly imageRepository:Repository<Image> 
   , @InjectRepository(Section) private readonly sectionRepository:Repository<Section> 
   , @InjectRepository(Course) private readonly courseRepository:Repository<Course> 
  ){}


 

  
  async getallimages(userId:number){
    return  await this.imageRepository.find({where:{user:{id:userId}}})
  }
  async deleteimage(userId:number,id:number){
    return await this .imageRepository.delete({user:{id:userId},id:id})  
  }
  async getimagebyid(userId:number,id:number){
    return await this.imageRepository.findOneBy ({user:{id:userId},id:id})
  }
  async getLastImage(userId: number) {
    return await this.imageRepository.findOne({
      where: { user: { id: userId } }, 
      order: { id: 'DESC' }, 
      relations: ['user'],
    });
  }


  async handleFileUpload(id: number, file: Express.Multer.File) {
   try{
    if (!file) {
    return new BadRequestException('No file uploaded');
  }

  const user = await this.user.findOne({ where: { id ,},relations:['images'] });
  if (!user) {
    return  new ForbiddenException('User not found');
  }
  

  user.image = file.path;
  const newImage = this.imageRepository.create({
    url: file.path,  
    user: user,      
  });

  await this.imageRepository.save(newImage);

  user.images.push(newImage);
  await this.user.save(user,);

  return { message: 'File uploaded successfully', imagePath: user.image, };}catch(e){console.log(e);
    return e;
  } 
  }



//   async teacherGrades(){
//  return   await this.user.findmany({})
//   }
  async uploadFile(id: number, file: Express.Multer.File, createSectionDto: CreateSectionDto) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
  
      const user = await this.user.findOne({ where: { id }, relations: ['section'] });
      if (!user) {
        throw new ForbiddenException('User not found');
      }
  
      user.cardimg = file.path;
  
      const newSection = this.sectionRepository.create({
        cardimg: file.path,
        name: createSectionDto.name,
        price: createSectionDto.price,
        viewingWatching: createSectionDto.viewingWatching,
        description: "sadde",
        course:this.courseRepository.create({id:2}),
        userId: user,
      });
  
      
      await this.sectionRepository.save(newSection);
  
  
      user.section.push(newSection);
  
      await this.user.save(user);
  
      return { 
        message: 'File uploaded successfully', 
        imagePath: user.cardimg,
        section: newSection,
      };
    } catch (e) {
      console.error(e);
      throw new  BadRequestException('Failed to upload file');
    }
  }

    
  findAll(id:number) {
    return this.user.findOne({where:{id}});
  }


  async deleteUser(id: number): Promise<void> {
    const result = await this.user.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not fond`);
    }
  }

  async deleteUserByAuth(userId: number, loggedInUserId: number): Promise<void> {
    if (userId !== loggedInUserId) {
      throw new ForbiddenException("You can't delete another user's account");
    }
    await this.deleteUser(userId);
  }
  
  async softDeleteUser(id: number): Promise<void> {
    const result = await this.user.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }


  async deleteAccount(userId: number): Promise<void> {
    const user = await this.user.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.user.softDelete(userId);
  }

  async restoreAccount(userId: number): Promise<void> {
    await this.user.restore(userId);
  }

  async freezeAccount(userId: number): Promise<void> {
    const user = await this.user.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;
    await this.user.save(user);
  }

  async unfreezeAccount(userId: number): Promise<void> {
    const user = await this.user.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = true;
    await this.user.save(user);
  }
  // @Get ('list')
  // getUploadedFiles(){

  // }
  async userInputInfo(userId: number, newEmail: string,fullname:string,phone:string): Promise<User> {
    const user = await this.user.findOne({ where: { id: userId,} });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const emailExists = await this.user.findOne({ where: { email: newEmail ,fullname:fullname,phone:phone }, });
    if (emailExists) {
        throw new ConflictException('Email is already in use');
    }

    user.email = newEmail;
    return await this.user.save(user,);
}




}
