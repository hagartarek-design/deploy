import {Controller,Get,Post,Body,Patch,Param,Query} from '@nestjs/common';
import { CourseAttendService } from './course_attend.service';
import { CreateCourseAttendDto } from './dto/create-course_attend.dto';
import { UpdateCourseAttendDto } from './dto/update-course_attend.dto';

@Controller('course-attend')
export class CourseAttendController {
  constructor(private readonly courseAttendService: CourseAttendService) {}

  @Post()
  create(@Body() createCourseAttendDto: CreateCourseAttendDto) {
    return this.courseAttendService.create(createCourseAttendDto);
  }

@Get()
withpaginating(@Query() paginationDto:CreateCourseAttendDto){
  const {page,limit} = paginationDto;

  const offset = (page - 1) * limit;
return this.courseAttendService.withpaginating(offset,limit)

}

@Get('/all')
withoutpaginating(){

return this.courseAttendService.withoutpaginating()

}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseAttendDto: UpdateCourseAttendDto) {
    return this.courseAttendService.update(+id, updateCourseAttendDto);
  }

}
