import { Optional } from "@nestjs/common"
import { Userquestion } from "src/teacher/userquestion/entities/userquestion.entity"

export class CreateAssignmentDto {

    @Optional()
    name:string
    @Optional()
    questions?:Userquestion
    @Optional()
    degree:number
    @Optional()
    lastdate:string
 @Optional()
    startdate:string
    @Optional()
    price:number
    @Optional()
    assigcardimg:string
}
