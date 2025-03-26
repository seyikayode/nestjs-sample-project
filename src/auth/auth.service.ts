import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bycrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistesService } from 'src/artistes/artistes.service';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artisteService: ArtistesService
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string } | { validate2FA: string, message: string }> {
        const user = await this.userService.findOne(loginDTO)

        const passwordMatched = await bycrypt.compare(loginDTO.password, user.password);
        if (passwordMatched) {
            delete (user as { password?: string }).password;
            const payload: PayloadType = { email: user.email, userId: user.id };
            const artiste = await this.artisteService.findArtiste(user.id);
            if (artiste) {
                payload.artisteId = artiste.id;
            }

            if (user.enable2FA && user.twoFASecret) {
                return {
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message: 'Please send the one time password/token from your authenticator app'
                }
            }

            return { accessToken: this.jwtService.sign(payload) }

        } else {
            throw new UnauthorizedException('Password is incorrect')
        }
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.findById(userId);
        if (user.enable2FA) {
            return { secret: user.twoFASecret }
        }

        const secret = speakeasy.generateSecret();
        console.log(secret);
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return { secret: user.twoFASecret }
    }

    async validate2FAToken(userId: number, token: string): Promise<{ verified: boolean }> {
        try {
            const user = await this.userService.findById(userId);
            const verified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                token: token,
                encoding: 'base32'
            });

            if (verified) {
                return { verified: true };
            } else {
                return { verified: false };
            };

        } catch(err) {
            throw new UnauthorizedException('Error verifying token')
        }
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId);
    }

    async validateUserByApiKey(apiKey: string): Promise<User> {
        return this.userService.findByApiKey(apiKey);
    }
}