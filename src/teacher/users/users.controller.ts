import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Request, UseInterceptors, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { AuthGuard } from '../../../common/Gaurds/auth.guard';

import { CreateSectionDto } from 'src/sections/dto/create-section.dto';
import { AuthGuard } from 'src/common/Gaurds/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
@Patch('updateInfo')
userInputInfo(@Req() req,
@Body('email') email:string,
@Body('fullname') fullname:string 
,@Body('phone') phone:string){
//   console.log(


//   req.user
//  );
 
  return this.usersService.userInputInfo(req.user.id,email,fullname, phone)

}
  

    @Get('userInfo')
    findAll(@Request() req) {
      return this.usersService. findAll(req.user.id);
    }

  @Patch('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    // console.log('User:', req.user);
    // console.log('Uploaded File:', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const response = await this.usersService.handleFileUpload(req.user.id, file);
    return response;
  }

// @Post()
// deleteAccount(){

// }
@Post('/upload')
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
async uploadcard(@Request() req, @UploadedFile() file: Express.Multer.File,@Body() createSectionDto:CreateSectionDto) {
  // console.log('User:', req.user);
  // console.log('Uploaded File:', file);

  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  const response = await this.usersService.uploadFile(req.user.id, file,createSectionDto);
  return response;
}
@Get()
// @UseGaurds(AuthGaurd)
teacherGrades(){
// return this.
}
@Get('/images/last')
@UseGuards(AuthGuard) 
async getLastUserImage(@Request() req) {
  return this.usersService.getLastImage(req.user.id);
}
@Get('/getallimages')
@UseGuards(AuthGuard) // 
async getallimages(@Request() req){
  // console.log(req.user.id);
  
  // console.log(await this.usersService.getallimages(req.user.id));
  
  return await this.usersService.getallimages(req.user.id)
}
@Get ('/uniqueImg/:id')
@UseGuards(AuthGuard)
async getimagebyid(@Request() req, @Param("id") id:number){
return this .usersService.getimagebyid(req.user.id,id)
}

@Delete('/image/:id')
@UseGuards(AuthGuard) // 
async deleteimage(@Request() req,@Param('id') id:number){
  // console.log(req.user.id);

  
  return await this.usersService.deleteimage(req.user.id,id)
}




  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  @Delete('me')
   
    async deleteOwnAccount(@Req() req) {
      await this.usersService.deleteUserByAuth(req.user.id, req.user.id);
      return { message: 'Your account has been deleted' };
    }
    
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }


    @Delete(':id')
    async deleteAccount(@Param('id') id: number) {
      await this.usersService.deleteAccount(id);
      return { message: 'Account deleted successfully' };
    }
    @Patch('restore/:id')
    async restoreAccount(@Param('id') id: number) {
      await this.usersService.restoreAccount(id);
      return { message: 'Account restored successfully' };
    }
  
    @Patch('freeze')
    async freezeAccount(@Req() req) {
      await this.usersService.freezeAccount(req.user.id);
      return { message: 'Account frozen successfully' };
    }
  
    @Patch('unfreeze')
    async unfreezeAccount(@Req() req) {
      await this.usersService.unfreezeAccount(req.user.id);
      return { message: 'Account unfrozen successfully' };
    }
  
  
}
