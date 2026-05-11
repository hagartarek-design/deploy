import { BadRequestException,Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';import * as admin from 'firebase-admin';
import { Role } from '../role/entities/role.entity';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, GoogleLoginDto } from './dto/create-user.dto';
import { User } from '../teacher/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users:Repository<Users>
,
 @InjectRepository(User) private readonly user:Repository<User>
,
private  jwtService:JwtService
,@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin
,@InjectRepository(Role) private readonly roleRepository:Repository<Role>
){} 
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new users';
  }
  
  async verifyGoogleToken(idToken: string) {
  try {
    const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(idToken);
    return {
      email: decodedToken.email,
      name: decodedToken.name,
      // picture: decodedToken.picture,
      uid: decodedToken.sub,
    };
  } catch (error) {
    console.error(' Google token verification error:', error);
    throw new Error('Invalid Google token');
  }
} 

//   async googleLogin(dto: GoogleLoginDto) {
//     const { idToken, roles } = dto;

//     const { email, name } = await this.verifyGoogleToken(idToken);

//     const roleEntity = await this.roleRepository.findOne({
//       where: { name: roles },
//     });

//     if (!roleEntity) {
//       console.log('Invalid roles');
//       throw new BadRequestException('Invalid roles');
//     }

//     let user = await this.users.findOne({
//       where: { email },
//     });

//     if (user && user.roles !== roles) {
//       console.log('Not allowed for you');
//       throw new NotFoundException('Not allowed for you');
//     }
// const teacher=await this.user.findOne({where:{email:email}})
//     if (!user) {
    
//       user = this.users.create({
//         email:teacher.email,
//         name:teacher.name,
//         // picture, // optional
//         provider: 'google',
//         roles: roles || 'user', 
//       });
//       await this.users.save(user);
//     }

//     // 🔹 Payload for JWT
//     const payload = {
//       sub: user.id,
//       email: user.email,
//       roles: user.roles,
//     };

//     // 🔹 Generate access token
//     const token = this.jwtService.sign(payload, {
//       secret: process.env.SECRET_KEY,
//       expiresIn: '1d',
//     });

//     // 🔹 Generate refresh token
//     const refreshToken = this.jwtService.sign(payload, {
//       secret: process.env.REFRESH_TOKEN,
//       expiresIn: '7d',
//     });

//     // 🔹 Hash refresh token and store in DB
//     const hashed = await bcrypt.hash(refreshToken, 10);
//     await this.users.update(user.id, { refreshToken: hashed });

//     return {
//       success: true,
//       token,
//       refreshtoken: refreshToken,
//       roles: user.roles,
//       userId: user.id,
//     };
//   }
async googleLogin(dto: GoogleLoginDto) {
  const { idToken, roles } = dto;

  const { email, name } = await this.verifyGoogleToken(idToken);

  // 1️⃣ role check
  const roleEntity = await this.roleRepository.findOne({
    where: { name: roles },
  });
  if (!roleEntity) {
    throw new BadRequestException('Invalid role');
  }

  // 2️⃣ find or create teacher by email
  let teacher = await this.user.findOne({ where: { email } });

  if (!teacher) {
    teacher = this.user.create({
      email,
      name,
      provider: 'google',
      role: roles,
    });
    await this.user.save(teacher); // ⭐ لازم يتحفظ الأول
  }

  // 3️⃣ find or create users
  let user = await this.users.findOne({
    where: { email },
    relations: ['teacher'],
  });

  if (!user) {
    user = this.users.create({
      email,
      name,
      provider: 'google',
      roles: roles,
      teacher: teacher, // ⭐ الربط
    });
  } else {
    // لو موجود بس teacher_id فاضي
    if (!user.teacher) {
      user.teacher = teacher;
    }
  }

  // ⭐⭐ save مش update
  await this.users.save(user);

  // 4️⃣ tokens
  const payload = {
    id: teacher.id,
    email: teacher.email,
    roles: user.roles,
  };

  const token = this.jwtService.sign(payload, {
    secret: process.env.SECRET_KEY,
    expiresIn: '1d',
  });

  const refreshToken = this.jwtService.sign(payload, {
    secret: process.env.REFRESH_TOKEN,
    expiresIn: '7d',
  });

  user.refreshToken = await bcrypt.hash(refreshToken, 10);
  await this.users.save(user); // ⭐ save مش update

  return {
    success: true,
    token,
    refreshtoken: refreshToken,
    userId: user.id,
    teacherId: teacher.id, // ✅ دلوقتي مش فاضي
  };
}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} users`;
  }

  remove(id: number) {
    return `This action removes a #${id} users`;
  }
}
