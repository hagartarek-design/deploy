import { Controller, Get, Post, Body, Request, Req, Put, UseGuards, Res, HttpException, HttpStatus, 
  // UseGuards, 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';
import { Public } from './entities/public';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './googleauthservice';
// import { AuthGuard } from './auth.guard';

@Controller('auth')
// @UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService,     
  private readonly googleAuthService: GoogleAuthService,) {

    this.googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    this.googleClient2 = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID2,
      process.env.GOOGLE_CLIENT_SECRET2
    );

  }
  private googleClient: OAuth2Client;
  private googleClient2: OAuth2Client;
  // private authService: AuthService,

  @Public()
  @Post('google-login')
  async googleLogin(@Body('idToken') idToken: string)
   {
    return await this.authService.googleLogin(idToken);
  }
  @Public()
  @Post('google-login/students')
  async studentGoogleLogin(@Body('idToken') idToken: string)
   {
    return await this.authService.studentGoogleLogin(idToken);
  }
  
  async verifyGoogleToken(idToken){
    const client = new OAuth2Client();
   const ticket=await client.verifyIdToken({
      idToken
      ,audience:process .env.CLIENT_ID
    })
  const payload=ticket.getPayload();
  // console.log(payload);
  
  }
  // async verifyGooglestudentToken(idToken){
  //   const client = new OAuth2Client();
  //  const ticket=await client.verifyIdToken({
  //     idToken
  //     ,audience:process .env.CLIENT_ID2
  //   })
  // const payload=ticket.getPayload();
  // console.log(payload);
  
  // }
  @Public()
  @Post('/login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    // console.log( this.authService.login(email, password));
    
    return await this.authService.login(email, password);
  }

  @Public()
@Post('login/student')
  // @UseGuards(JwtAuthGuard)
async loginstudent(@Body('email') email:string,@Body("password") password:string){
return await this.authService.loginstudent(email,password);
}
 @Public()
 @Post('refresh')
  refresh(@Body() body: {  refreshToken: string }) {
    return this.authService.refreshTokens( body.refreshToken);
  }
@Post('/logout')
async logout(@Request() req) {
return this.authService.logout(req.user.id);
  }
  
  // @Public()
  // @Post('/login')
  
  // async login(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   return this.authService.login(email, password);
  // }
  

  @Public()
  @Post('/register')
  register(@Body('email') email:string,@Body('password') password:string,@Body('phone') phone:string,@Body('username') username:string,
@Body('fullname') fullname:string)
  {
    const data= this.authService.register(email,password,phone,username,fullname)
    return data
  }

  @Public()
  @Post('/register/students')
  studentregister(@Body('email') email:string,@Body('name') name:string,@Body('password') password:string,@Body('phone') phone:string,

@Body('fullname') fullname:string)
  {
    const data= this.authService.studentregister(email,password,name,phone,fullname)
    return data
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }
//   @Get()
//   async googleLogin (@Body() idToken:any){
//   const payload=  await this.verifyGoogleToken(idToken)
   

// }
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
  @Put ('change-password')
  async changePassword(@Req() req, @Body() dto: CreateAuthDto) {
    return this.authService.changePassword(req.user.id, dto.oldPassword, dto.newPassword);
  }
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    }
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Res() res) {
      const user = req.user;
      return res.redirect(`flutterapp://login?token=${user.accessToken}`);
    }
  
  




}