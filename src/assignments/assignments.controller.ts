import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, Query, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { AuthGuard } from 'common/Gaurds/auth.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // @Post()
  // create(@Request()req, @Body() createAssignmentDto: CreateAssignmentDto) {
  //   return this.assignmentsService.create(req.user.id,createAssignmentDto);
  // }

     
    @Post('/upload')
    // @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadcard(
    @Request() req, @UploadedFile() file: Express.Multer.File
    ,@Body() CreateAssignmentDto:CreateAssignmentDto) {
      // console.log('User:', req.user);
      // console.log('Uploaded File:', file);
    
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
    
      const response = await this.assignmentsService.uploadFile(req.user.id, file,CreateAssignmentDto);
      return response;
    }
  @Get()
  findAll(@Request()req,) {
    return this.assignmentsService.findAll(req.user.id);
  }
  @Get('paginate')
  async withpaginatingsections(
    @Request() req,
    @Query() paginationDto?: UpdateAssignmentDto,
  ) {
    const { page, limit } = paginationDto;
    
    if (page && limit) {
    
      const offset = (page - 1) * limit;
      return this.assignmentsService.withpaginatingsections(req.user.id, offset, limit);
    } else {
     
      return this.assignmentsService.allassignments(req.user.id);
    }
  }

 @Get()
 allassignments(@Request() req){
  return this.assignmentsService.allassignments(req.user.id)
}


                                                                                                                                                                                                                                                                                                                         
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
