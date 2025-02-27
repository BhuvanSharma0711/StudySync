import { Body, Controller, Get, Post,Res, } from '@nestjs/common';
import { UserService } from './user.service';
import UserInfoDto from './dto/userinfo.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
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

}
