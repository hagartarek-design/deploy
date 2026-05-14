import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException, applyDecorators } from '@nestjs/common';

import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/teacher/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

// import { AuthGuard } from './auth.guard'; // ✅ Correct filename

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Student } from 'src/students/entities/student.entity';
@Injectable()
export class AuthService {
  // private readonly client: OAuth2Client;

  // constructor(private configService: ConfigService) {
  //   this.client = new OAuth2Client({
  //     clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
  //   });
  // }
  private client = new OAuth2Client;
  private readonly configService: ConfigService
  constructor(
    // ,
    @InjectRepository(User)
  private  user:Repository<User>,
 @InjectRepository(Student) private readonly students:Repository<Student>
//  ,
//  @InjectRepository(User) private readonly users:Repository<User>
,
@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin:  admin.app.App

,@Inject ('FIREBASE_TEACHER') private readonly firebaseteacher:admin.app.App,
private jwtService:JwtService
){
// const clientId = this.configService.get<string>('64872570774-tb7fkjbp00lat65nkdnk1o0buqtf4oc3.apps.googleusercontent.com');
//     this.client = new OAuth2Client(clientId);
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }



  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
  // async login(email: string, password: string) {
  //      const user = await this.user.findOneBy({ email });
  //      if (!user) {
  //        throw new BadRequestException('Invalid credentials');
  //      }
     
  //      const isPasswordValid = await bcrypt.compare(password, user.password);
  //      if (!isPasswordValid) {
  //        throw new BadRequestException('Invalid credentials');
  //      }
     
  //      const token = this.jwtService.sign({ id: user.id, email: user.email,name:user.username });
  //      return { message: 'Login successful', token };
  //    }
  async register(email: string, password: string, phone: string, username: string,fullname:string)
 {
   
    const existingUser = await this.user.findOne({ where: { email } });

    if (existingUser) {
           throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.user.create({ email, password: hashedPassword, phone, username,fullname });

    return this.user.save(user);
}
  async studentregister(email: string, password: string,name:string, phoneNum: string,fullname:string)
 {
   
    const existingUser = await this.students.findOne({ where: { email,} });

    if (existingUser) {
           throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const students = this.students.create({ email, password: hashedPassword,name, phoneNum,fullname,provider:"system" });

    return this.students.save(students);
}

// async login(email: string, password: string): Promise<User> {
//   const user = await this.userRepository.findOne({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//   }

//   return user;
// }
// }
async updateRefreshToken(userId: number, refreshToken: string | null) {
  const user = await this.students.findOne({
    where: { id: userId },
  });

  if (!user) return null;

  user.refreshToken = refreshToken;
  console.log("refreshhhhh"+user.refreshToken)
  console.log("rrrrre"+refreshToken)
  return this.students.save(user);
}

// async refreshTokens(id: number, refreshToken: string) {
//     const user = await this.students.findOneBy({id:Number(id)});
//     console.log("userrrrr"+user);
//     console.log("userrrrrssss"+user.id);
    
//     if (!user || !user.refreshToken) {
//       throw new UnauthorizedException('Logged out');
//     }

//     try {
//       this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_SECRET });
//     } catch (err) {
//       await this.updateRefreshToken(id, null);
//       throw new UnauthorizedException('Refresh token expired. Please login again.');
//     }

//     const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
//     if (!isMatch) {
//       throw new UnauthorizedException('Invalid refresh token');
//     }

//     const newAccessToken = this.jwtService.sign(
//       { sub: user.id },
//       { secret: process.env.SECRET_KEY, expiresIn: '1m' }
//     );

//     const newRefreshToken = this.jwtService.sign(
//       { sub: user.id },
//       { secret: process.env.REFRESH_SECRET, expiresIn: '7d' }
//     );

//     const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);
//     await this.updateRefreshToken(user.id, hashedRefresh);

//     return {
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     };
//   }


// async refreshTokens(id:number,refreshtoken:string){
//   const user =await this.user.findOne({id:userId});
// try{this.jwtService.verify(refreshtoken,{secret:process.env.REFRESH_SECRET})}
// catch(err){
//   await this.updateRefreshToken(userId,refreshtoken);
//   throw new UnauthorizedException('refresh token expired');


// }
// const isMatch =await bcrypt.compare(refreshtoken,user.refreshToken)
// if(isMatch
// ){return new ConflictException('invalid refreshtoken')}

// const newtoken =this.jwtService.sign(
//   {user:user.id},{secret:process.env.SECRET_KEY,expiresIn:'7d'})
//   const newrefresh=this.jwtService.sign({sub:user.id},{secret:process.env.REFRESH_SECRET,expiresIn:'7d'});
//   await this.updateRefreshToken(user.id,await bcrypt.hash(newrefresh,10));
// return {accessToken:newtoken,refreshtoken:newrefresh}
// }


 async refreshTokens(refreshToken: string) {
  try {
    const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_SECRET });

    const student = await this.students.findOne({ where: { id: payload.id } });
    if (!student || !student.refreshToken) return new UnauthorizedException();

    const isMatch = await bcrypt.compare(refreshToken, student.refreshToken);
    if (!isMatch) return new UnauthorizedException();
//  await this.students.update(student.id, { refreshToken: refreshToken });
console.log(student.id);
console.log(student.email);
console.log(isMatch);
    
const token = this.jwtService.sign(
      { id: student.id, email: student.email },
      { secret: process.env.SECRET_KEY, expiresIn: '1m' },   
    );

    return { token };
  } catch (err) {
   return new ConflictException('wrong token')
  }
}




async loginstudent(email:string,password:string){



  const students = await this.students.findOne({ where: { email } });

  if (!students||!students.isActive==true) {
    return  new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, students.password);
  if (!isPasswordValid) {
    
    return new BadRequestException()
  }

  const token = this.jwtService.sign({ id: students.id, email: students.email }, {secret:process.env.SECRET_KEY ,expiresIn: '1m' });
const refreshtoken=this.jwtService.sign({id:students.id,email:students.email},{secret:process.env.REFRESH_SECRET,expiresIn:'15h'})
const hashedrefreshtoken = await bcrypt.hash(refreshtoken,10);
  await this.students.update(students.id, { refreshToken: hashedrefreshtoken });
console.log();
if (!students || !(await bcrypt.compare(password, students.password,))) {
  return new UnauthorizedException('Invalid credentials');
}
  return { message: 'Login successful', token ,refreshtoken};


}

async login(email: string, password: string) {


  
  const user = await this.user.findOne({ where: { email } });

  if (!user||!user.isActive==true) {
    return  new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    
    return new BadRequestException()
  }

  const token = this.jwtService.sign({ id: user.id, email: user.email }, { expiresIn: '7h' });

  await this.user.update(user.id, { refreshToken: token });
console.log();
if (!user || !(await bcrypt.compare(password, user.password))) {
  return new UnauthorizedException('Invalid credentials');
}
  return { message: 'Login successful', token };
}

async logout(userId: number) {
  // console.log(  await this.user.update(userId, { refreshToken: null }));
  await this.user.update(userId, { refreshToken: null })

  return { message: 'Logout successful' };
}


async changePassword(userId: number, oldPassword: string, newPassword: string) {
  const user = await this.user.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new BadRequestException('Old password is incorrect');
  }

 
  user.password = await bcrypt.hash(newPassword, 10);
  await this.user.save(user);

  return { message: 'Password updated successfully' };
}










async validateUser(googleId: string): Promise<User | null> {
  return this.user.findOne({ where: { googleId } });
}



























async verifystudentToken(idtoken:string){
  try {
    const decoratedToken=await this.firebaseAdmin.auth().verifyIdToken(idtoken);
    return {email :decoratedToken.email,
      name :decoratedToken,
      picture :decoratedToken.picture
      ,uid:decoratedToken.uid
    }
  } catch (error) {
  //  console.log(error);
    
  }
}
async verifyGoogleTokenTeacher(idToken: string) {
  try {
    const decodedToken =
      await this.firebaseteacher.auth().verifyIdToken(idToken);

    return {
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      uid: decodedToken.uid,
    };
  } catch (error) {
    console.error('Teacher Google token verification error:', error);
    throw new Error('Invalid Google token');
  }
}
async verifyGoogleToken(idToken: string) {
  try {
    const decodedToken =
      await this.firebaseAdmin.auth().verifyIdToken(idToken);

    return {
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      uid: decodedToken.uid,
    };
  } catch (error) {
    console.error('Admin Google token verification error:', error);
    throw new Error('Invalid Google token');
  }
}
// async studentGoogleLogin(idToken:string){
//   try {
//     const { email, name, picture } = await this.verifyGoogleToken(idToken);

//     let students = await this.students.findOne({ where: { email } });
//     if (!students) {
//       students = await this.students.create({
//         name: name,
//         email,
//         provider: 'google',
//         picture: picture,
//       });
//       await this.students.save(students);
//     }

//     const token = this.jwtService.sign(
//       { id: students.id, email: students.email },
//       { secret: process.env.SECRET_KEY, expiresIn: '2d' }, 
//     );
//     console.log('id:'+token);
    

//     const refreshtoken = this.jwtService.sign(
//       { id: students.id, email: students.email },
//       { secret: process.env.REFRESH_SECRET, expiresIn: '5d' }, 
//     );

//     const hashedrefreshtoken = await bcrypt.hash(refreshtoken, 10);
//     await this.students.update(students.id, { refreshToken: hashedrefreshtoken });

//     return {
//       success: true,
//       message: 'Logged in successfully',
//       token,           // Access Token
//       refreshtoken,    // Refresh Token  
//       userId: students.id,
//       students:students
//     };
//   } catch (error) {
//     return error;
//   }
// }

// async studentGoogleLogin(idToken:string){
// try {
//   const { email, name, picture } = await this.verifyGoogleToken(idToken);

//   let students = await this.students.findOne({ where: { email } });
//   if (!students) {
//     // const imagess=students.images
//     students =await this.students.create({
//       name: name,
//       email,
//       provider: 'google',
//      picture:picture,
//     });
    
//     // students.section = { id: students.id } as any;
//     await this.students.save(students,);
//   }

//   const token = this.jwtService.sign(
//     { id: students.id , email:students.email},
//     { secret:process.env.SECRET_KEY,expiresIn: '1m' },
//   );

//   // const refreshToken = this.jwtService.sign(
//   //   { id: students.id , email:students.email},
//   //   { expiresIn: '7d' },
//   // );
//   const refreshtoken=this.jwtService.sign({id:students.id,email:students.email},{secret:process.env.REFRESH_SECRET,expiresIn:'15h'})
// const hashedrefreshtoken = await bcrypt.hash(refreshtoken,10);
//   await this.students.update(students.id, { refreshToken: hashedrefreshtoken });
// console.log('token:',token);
// // console.log('idtoken:',idToken);
// // if(!idToken){
// //   return new ConflictException("Invalid Id token")
// // }
//   return {
//     success: true,
//     message: 'Logged in successfully',
//     token,userId:students.id,
//     refreshtoken,
//   }; //  try{}catch(e)
// } catch (error) {
//   return error
// }
 
// }

async googleLogin(idToken: string,roles) {
  const { email, name, picture } = await this.verifyGoogleTokenTeacher(idToken);
  let user = await this.user.findOne({ where: { email } });
  console.log(user)

  if (!user) {
    user = this.user.create({
      name: name,user:{roles:roles},
      email,
      provider: 'google',
      image:picture,
    });
    user.section = { id:  user.id } as any;
    await this.user.save(user,);
  }

  const token = this.jwtService.sign(
    { id: user.id , email:user.email,roles:roles},
    { expiresIn: '1m' },
  );

  const refreshtoken = this.jwtService.sign(
    { id: user.id , email:user.email,roles:roles},
    { expiresIn: '2m' },
  );
console.log(token);

  return {
    success: true,
    message: 'Logged in successfully',
    token,userId:user.id,
    refreshtoken,user: {
      roles:roles,
    id: user.id,
    email: user.email,
    name: user.name,
  }
  };
}
async studentGoogleLogin(idToken: string,) {
  const { email, name,  } = await this.verifyGoogleToken(idToken);
  let student = await this.students.findOne({ where: { email } });
  console.log(student)

  if (!student) {
    student = this.students.create({
      name: name,
      email,
      provider: 'google',
      // image:picture,
    });
    // student.section = { id:  student.id } as any;
    await this.students.save(student,);
  }

  const token = this.jwtService.sign(
    { id: student.id , email:student.email,},
    { expiresIn: '1m' },
  );

  const refreshtoken = this.jwtService.sign(
    { id: student.id , email:student.email,},
    { expiresIn: '2m' },
  );
console.log(token);

  return {
    success: true,
    message: 'Logged in successfully',
    token,studentId:student.id,
    refreshtoken,student: {
  
    id: student.id,
    email: student.email,
    name: student.name,
  }
  };
}





  async verifyIdTokenstudent(idToken: string): Promise<TokenPayload> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('60396017051-fmcd4jemom9tckcbfq97b0l1c40ulcfg.apps.googleusercontent.com'),
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }
    
    return payload;
  }
  async verifyIdToken(idToken: string): Promise<TokenPayload> {
    const ticket = await this.client.verifyIdToken({
      idToken,


      audience: this.configService.get<string>('804258373122-j062cocfrfddq103m6ms16mqtmdp1a62.apps.googleusercontent.com'),
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }
    
    return payload;
  }



































  
  async findOrCreateUser(userData: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<User> {
    let user = await this.user.findOne({
      where: { googleId: userData.googleId },
    });

    if (!user) {
      user = this.user.create(userData);
      await this.user.save(user);
    }

    return user;
  }

  generateJwt(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

}
