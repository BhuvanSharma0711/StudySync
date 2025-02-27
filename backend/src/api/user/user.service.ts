import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import UserInfoDto from './dto/userinfo.dto'
import sendEmail from 'src/handlres/email.global';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import handleErrors from 'src/handlres/handleErrors.global';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class UserService {
  constructor (
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
  ) {}

  getHello(): string {
    return 'Hello World in user!';
  }
  
  async sendVerificationCode(
    email: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      const res = await sendEmail(email, subject, text);
      return res;
    } catch (error) {
      return false;
    }
  }

  async register(body:UserInfoDto) {

    const { name, email, password } = body;

    if(!name || !email ||!password) {
      throw new ForbiddenException('Missing required fields');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    let user = await this.prisma.user
    .create({
      data: {
        name,
        email,
        password,
      },
    })
    .catch((error) => {
      handleErrors(error);
    });

    const verificationCode = Math.random().toString(8).substring(2,6);

    try {
      await this.redisClient.set(email, verificationCode);
    } catch (error) {
      return error;
    } finally {
      const subject = 'Email Verification';
      const text = `Your verification code is ${verificationCode}`;
      await this.sendVerificationCode(email, subject, text);
    }
    return user;
  }

  async verifyEmail(body: { email: string; token: string }, response) {
    const verificationCode = await this.redisClient.get(body.email);
    
    if (verificationCode != body.token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    await this.redisClient.del(body.email);

    let user = await this.prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        isVerified: true,
      },
    });
    return { message: 'Email verified successfully' };
  }
  async Login(body :{email:string; password:string}) {
    let user = await this.prisma.user.findUnique({
      where: {
        email:body.email,
      },
    })
    if(!user) {
      throw new HttpException('user not found',HttpStatus.NOT_FOUND);
    }
    if(!user.isVerified) {
      throw new HttpException('user not verified', HttpStatus.UNAUTHORIZED);
    }
    if(user?.password!=body.password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'login successfully' };
  }
  async getUsersWithSimilarInterests(userId: string) {
    console.log("Searching for user ID:", userId);
    const user = await this.prisma.user.findUnique({ where: { id: userId.trim() } });
    if(!user) {
      throw new HttpException('user not found',HttpStatus.NOT_FOUND);
    }

    return this.prisma.user.findMany({
      where: {
        id: { not: userId.trim() },
        interests: { hasSome: user.interests }, // Find users with overlapping interests
      },
    });
  }

  async addUserInterest(body:{ userId: string; interest: string }) {
    const { userId, interest } = body;

    // Ensure user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId.trim() } });
    if (!user) throw new HttpException('user not found',HttpStatus.NOT_FOUND);

    return this.prisma.user.update({
      where: { id: userId },
      data: { interests: { push: interest } }, // Correct way to update array fields
    });
  }
  async exportClickData() {
    return this.prisma.click.findMany({
      include: { user: true, file: true }
    });
  }

  async getAllFiles() {
    return this.prisma.file.findMany();
  }
  async getRecommendedFiles(userId: string): Promise<any> {
    try {
      const command = `python scripts/recommend.py ${userId}`;
      const { stdout, stderr } = await execPromise(command);

      if (stderr) {
        console.error(`Python Error: ${stderr}`);
        throw new HttpException('Python script execution failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return JSON.parse(stdout);
    } catch (error) {
      console.error(`Execution Error: ${error.message}`);
      throw new HttpException('Failed to fetch recommended files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({where: { id: userId.trim() } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getUserRecommendations(userId: string): Promise<any> {
    try {
      // Execute Python script and pass userId
      const { stdout } = await execPromise(`python scripts/recommend-user.py ${userId}`);
      return JSON.parse(stdout); // Convert the output to JSON
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw new Error('Failed to generate recommendations');
    }
  }  
}
