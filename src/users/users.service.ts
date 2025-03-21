import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bycrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(userDTO: CreateUserDTO): Promise<User> {
        const salt = await bycrypt.genSalt();
        userDTO.password = await bycrypt.hash(userDTO.password, salt);
        const user = await this.userRepository.save(userDTO);
        delete (user as { password?: string }).password;
        return user;
    }

    async findOne(data: LoginDTO): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email })
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        };
        return user;
    }
}
