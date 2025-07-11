import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp({ email, password,fullName,image }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('user alredy exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      fullName,
      image
    });

    return { message: 'sign up passed successfully', data: newUser };
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('password');
    if (!existUser) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordEqual = await bcrypt.compare(password, existUser.password);
    if (!isPasswordEqual) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      id: existUser._id,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { token };
  }
  async getCurrentUser(userId,req) {
    const user = await this.userModel.findById(userId);
    console.log(req.userId, 'reqqqqqqqqqqqqq')
    return user;
  }
}
