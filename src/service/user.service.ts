import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodeUUID from 'node-uuid';
import { User } from '../entity/user.entity';
import { DeniedException } from '../exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepsitory: Repository<User>,
  ) { }
  public async login(userName: string, password: string): Promise<User> {
    const user = await this.userRepsitory.findOne({
      where: {
        name: userName,
        password,
      },
    });
    if (!user) {
      throw new DeniedException();
    }
    user.token = nodeUUID.v1();
    return this.userRepsitory.save(user);
  }
  public async signUp(userName: string, password: string): Promise<User> {
    const user = this.userRepsitory.create();
    user.name = userName;
    user.password = password;
    console.log(user);
    return this.userRepsitory.save(user);
  }

  public async findByToken(token: string): Promise<User> {
    const user = await this.userRepsitory.findOne({
      where: {
        token,
      },
    });
    if (user) {
      return user;
    } else {
      throw new DeniedException();
    }
  }
}
