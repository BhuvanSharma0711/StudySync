import { Body, Controller, Get, Post,Res,Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import UserInfoDto from './dto/userinfo.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('register')
  register(@Body() body:UserInfoDto) {
    return this.userService.register(body)
  }

  @Post('login')
  login(@Body() body:{email:string; password:string}) {
    return this.userService.Login(body)
  }

  @Post('verify')
  verifyEmail(
    @Body() body: { email: string; token: string },
    @Res({ passthrough: true }) response,
  ) {
    return this.userService.verifyEmail(body,response)
  }

  @Get('similar/:userId')
  getUsersWithSimilarInterests(@Param('userId') userId: string) {
    return this.userService.getUsersWithSimilarInterests(userId);
  }

  // Add a new interest to a user
  @Post('addinterest')
  addUserInterest( @Body() body: { userId: string; interest: string }) {
    return this.userService.addUserInterest(body);
  }

  @Get('clicks/export')
  exportClickData() {
    return this.userService.exportClickData();
  }
  @Get('recommended-files/:userId')
  async getRecommendedFiles(@Param('userId') userId: string) {
    try {
      return await this.userService.getRecommendedFiles(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('files/all')
  async getAllFiles() {
    return this.userService.getAllFiles();
  }
  
  @Get(':userId/recommendations')
  async getUserRecommendations(@Param('userId') userId: string) {
    return this.userService.getUserRecommendations(userId);
  }
}
