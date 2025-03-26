import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistesModule } from 'src/artistes/artistes.module';
import { ApiKeyStrategy } from './api-key-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    ArtistesModule
  ],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
