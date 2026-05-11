import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userquestion } from './entities/userquestion.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { createanswerDto } from './dto/create-userquestion.dto';
import { Lesson } from '../lesson/entities/lesson.entity';
import { log } from 'console';
// import e from 'express';

@Injectable()
export class UserquestionService {
  constructor ( 
    @InjectRepository(Userquestion) private readonly questionRepository:Repository<Userquestion>
    ,@InjectRepository(Lesson) private readonly lessons:Repository<Lesson>
    ,@InjectRepository(Student) private readonly studentsRepo:Repository<Student>
){}
async resultExamAssign(lessonId: number) {
  const questions = await this.questionRepository.find({
    where: { lesson: { id: lessonId } },
    relations: ['lesson'],
  });

  const total = questions.length;

  if (total === 0) {
    return {
      total: 0,
      solvedPercent: 0,
      restPercent: 0,
      truePercent: 0,
      falsePercent: 0,
      choose: {
        solvedPercent: 0,
      
      
        truePercent: 0,
        falsePercent: 0,
      },
    };
  }

  const solved = questions.filter(q => q.student_answer !== null && q.student_answer !== '');
  const rest = questions.filter(q => q.student_answer === null || q.student_answer === '');
  const trueQuestions = solved.filter(q => q.trueAnswer === true);
  const falseQuestions = solved.filter(q => q.trueAnswer === false);

  const chooseQuestions = questions.filter(q => q.type_ques === 'chooses');
  const chooseSolved = chooseQuestions.filter(q => q.student_answer !== null && q.student_answer !== '');
  const chooseTrue = chooseSolved.filter(q => q.trueAnswer === true);
  const chooseFalse = chooseSolved.filter(q => q.trueAnswer === false);

  return {
    total:total,
degree:total === 0
  ? 0
  : Math.round((trueQuestions.length / total) * 100)
,
    // Round percentages to nearest integer
    solvedPercent: Math.round((solved.length / total) * 100),
    solved:solved.length,
    restPercent: Math.round((rest.length / total) * 100),
    rest: rest.length ,
    truePercent: Math.round((trueQuestions.length / total) * 100),
    trueans: trueQuestions.length,
    falsePercent: Math.round((falseQuestions.length / total) * 100),
    falseans:falseQuestions.length,

    choose: {
     degree:chooseQuestions.length === 0
  ? 0
  : Math.round((trueQuestions.length / chooseQuestions.length) * 100)
,
      solvedPercent: chooseQuestions.length === 0
        ? 0
        : Math.round((chooseSolved.length / chooseQuestions.length) * 100),

      truePercent: chooseSolved.length === 0
        ? 0
        : Math.round((chooseTrue.length / chooseSolved.length) * 100),

      falsePercent: chooseSolved.length === 0
        ? 0
        : Math.round((chooseFalse.length / chooseSolved.length) * 100),
    },
  };
}


// async resultExamAssign(lessonId: number) {
//   // const questions = await this.questionRepository
//   //   .createQueryBuilder('q')
//   //   .leftJoin('q.lessons', 'lesson')
//   //   .where('lesson.id = :lessonId', { lessonId })
//   //   .getMany();
//   const questions = await this.questionRepository
//     .find({where:{lesson:{id:lessonId}},relations:['lesson']})
//     // .leftJoin('q.lessons', 'lesson')
//     // .where('lesson.id = :lessonId', { lessonId })
//     // .getMany();

//   const total = questions.length;
// // log
// if (total === 0) {
//     return {
//       total: 0,
//       solvedPercent: 0,
//       restPercent: 0,
//       truePercent: 0,
//       falsePercent: 0,
//       choose: {
//         solvedPercent: 0,
//         truePercent: 0,
//         falsePercent: 0,
//       },
//     };
//   }

//   // =========================
//   // 1️⃣ الأسئلة المتجاوب عليها
//   // =========================
//   const solved = questions.filter(
//     q => q.student_answer !== null && q.student_answer !== ''
//   );

//   // =========================
//   // 2️⃣ rest (غير chooses)
//   // =========================
//   const restQuestions = questions.filter(
//     q => q.type_ques !== 'chooses'
//   );

//   // =========================
//   // 3️⃣ الصح والغلط (من المتجاوب عليهم فقط)
//   // =========================
//   const trueQuestions = solved.filter(q => q.trueAnswer === true);
//   const falseQuestions = solved.filter(q => q.trueAnswer === false);

//   // =========================
//   // 4️⃣ choose فقط
//   // =========================
//   const chooseQuestions = questions.filter(
//     q => q.type_ques === 'chooses'
//   );

//   const chooseSolved = chooseQuestions.filter(
//     q => q.student_answer !== null && q.student_answer !== ''
//   );

//   const chooseTrue = chooseSolved.filter(q => q.trueAnswer === true);
//   const chooseFalse = chooseSolved.filter(q => q.trueAnswer === false);

//   // =========================
//   // 5️⃣ النتيجة النهائية
//   // =========================
//   return {
//     total,

//     // نسبة الأسئلة اللي اتحلت
//     solvedPercent: +(solved.length / total * 100).toFixed(2),

//     // نسبة الأسئلة غير choose
//     restPercent: +(restQuestions.length / total * 100).toFixed(2),

//     // الصح والغلط من كل الأسئلة
//     truePercent: +(trueQuestions.length / total * 100).toFixed(2),
//     falsePercent: +(falseQuestions.length / total * 100).toFixed(2),

//     choose: {
//       // نسبة اللي اتحل من choose
//       solvedPercent: chooseQuestions.length === 0
//         ? 0
//         : +(chooseSolved.length / chooseQuestions.length * 100).toFixed(2),

//       truePercent: chooseSolved.length === 0
//         ? 0
//         : +(chooseTrue.length / chooseSolved.length * 100).toFixed(2),

//       falsePercent: chooseSolved.length === 0
//         ? 0
//         : +(chooseFalse.length / chooseSolved.length * 100).toFixed(2),
//     },
//   };
// }

async answerOfQuestion (id:number,student_answer:string,//studentId:number

)
{
 
 console.log(id);
 console.log(student_answer);
 
  const rightAnswer=await this.questionRepository.findOne({where:{id:id,//students:{id:studentId}
  }})
  console.log(rightAnswer.id);
  if(rightAnswer.teacher_answer==rightAnswer.student_answer){
    return await this.questionRepository.update({id},{student_answer,trueAnswer:true},)
  
  
  }
  else {
    return await this .questionRepository.update({id},{student_answer,trueAnswer:false},)
  }
}
async answerOfQuestionexam(
  id: number,
  studentAnswerExam: string,
) {
  console.log('Question ID:', id);
  console.log('Student Answer:', studentAnswerExam);

  // Find the question
  const rightAnswer = await this.questionRepository.findOne({
    where: { id },
    relations: ['lesson'], // ensure relation is loaded
  });

  if (!rightAnswer) {
    console.log(`Question with id ${id} not found`);
    return { error: 'Question not found' };
  }

  // Get the related lesson safely
  const lessonId = rightAnswer.lesson?.id;
  if (!lessonId) {
    console.log(`Lesson not found for question id ${id}`);
    return { percent: 0 };
  }

  const lesson = await this.lessons.findOne({
    where: { id: lessonId },
    relations: ['content', 'questions'],
  });

  if (!lesson) return { percent: 0 };

  // Only process if content title matches "واجبات و امتحنات"
  const hasRequiredContent = lesson.content?.some(c => c.title === 'واجبات و امتحنات');
  if (!hasRequiredContent) return { percent: 0 };

  const questions = lesson.questions || [];

  if (!questions.length) {
    lesson.percentageAnswer = 0;
lesson.questions.map((e)=>e.solved=true)
    await this.lessons.save(lesson);
    return { percent: 0 };
  }

  // Determine if the student's answer matches the teacher's answer
  const isCorrect = rightAnswer.teacher_answer === studentAnswerExam;

  // Update the question record
  await this.questionRepository.update(
    { id },
    {
      studentAnswerExam,
      trueAnswerExam: isCorrect,
      solved: true,
    },
  );

  // Recalculate the lesson's percent
  const solvedCount = questions.filter(q => Number(q.solved) === 1).length;
  const percent = Math.round((solvedCount / questions.length) * 100);

  lesson.percentageAnswer = percent;
  await this.lessons.save(lesson);

  return { percent };
}

async questions(lessonId:number, page = 1, limit = 9) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 9, 1);

  const skip = (safePage - 1) * safeLimit;

  const [questions, total] = await this.questionRepository
    .createQueryBuilder('question')
    .leftJoinAndSelect('question.students', 'student')
    .leftJoinAndSelect('question.lesson', 'lesson')
    .where('lesson.id = :lessonId', { lessonId })
    .skip(skip)
    .take(safeLimit)
    .getManyAndCount();

  if (questions.length === 0) {
    throw new ForbiddenException("no questions");
  }

  return {
    data: questions,
    currentPage: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit),
  };
}

async lessonques(lessonId:number, page = 1, limit = 9) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 9, 1);

  const skip = (safePage - 1) * safeLimit;

  const [questions, total] = await this.lessons
    .createQueryBuilder('lesson')
    // .leftJoinAndSelect('question.students', 'student')
    .leftJoinAndSelect('lesson.questions', 'questions')
    .where('lesson.id = :lessonId', { lessonId })
    .skip(skip)
    .take(safeLimit)
    .getManyAndCount();

  if (questions.length === 0) {
    throw new ForbiddenException("no questions");
  }

  return {
    data: questions,
    currentPage: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit),
  };
}
// async 
async questionsexams(examId:number, page = 1, limit = 9) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 9, 1);
  const skip = (safePage - 1) * safeLimit;
  const [questions, total] = await this.questionRepository
    .createQueryBuilder('question')
    .leftJoinAndSelect('question.students', 'student')
    .leftJoinAndSelect('question.exam', 'exam')
    .where('exam.id = :examId', { examId })// بدال Not(IsNull())
    .skip(skip)
    .take(safeLimit)
    .getManyAndCount();

  if (questions.length === 0) {
    throw new ForbiddenException("no questions");
  }

  return {
    data: questions,
    currentPage: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit),
  };
}

 async findAll(page=1,limit=9) {
    const skip=(page-1)*limit;
    const questions=await this.questionRepository.find({relations:['students','lessons'],where:{students:{id:Not(IsNull())}}});
    questions.map( (students)=>students.students =students.students ?.slice (skip,skip+limit))
    // questions.map( (lessons)=>lessons.lessons =lessons.lessons ?.slice (skip,skip+limit))
    // const paginatedQuestions = questions.map(question => {
      //   return {
    //     ...question,
    //     students: question.students?.slice(skip, skip + limit)
    //   };
    // });
  if(questions.length==0)
    return new ForbiddenException("no questions")

    // return new ForbiddenException("no questions")
    return questions
  }

  findOne(id: number) {
    return `This action returns a #${id} userquestion`;
  }

  // update(id: number, updateUserquestionDto: UpdateUserquestionDto) {
  //   return `This action updates a #${id} userquestion`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userquestion`;
  }
async  addAnswer(createanswerDto:createanswerDto,id:number){
  const question = await this.questionRepository.findOne({
    where: { students: { id: id } },
    relations: ['students']
  });

  if (!question) {
    throw new NotFoundException('Question not found for this student');
  }

  Object.assign(question, createanswerDto);
  
  return await this.questionRepository.save(question);}
}