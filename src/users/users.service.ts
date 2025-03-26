import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bycrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(userDTO: CreateUserDTO): Promise<User> {
        const user = new User();
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.email = userDTO.email;
        user.apiKey = uuid4();

        const salt = await bycrypt.genSalt();
        user.password = await bycrypt.hash(userDTO.password, salt);
        const savedUser = await this.userRepository.save(user);
        delete (savedUser as { password?: string }).password;
        return savedUser;
    }

    async findOne(data: LoginDTO): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email })
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        };
        return user;
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id })
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        };
        return user;
    }

    async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            { twoFASecret: secret, enable2FA: true }
        )
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            { enable2FA: false }
        )
    }

    async findByApiKey(apiKey: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ apiKey });
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        };
        return user;
    }
}
