import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artiste } from 'src/artistes/artiste.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Song, Artiste])
    ],
    controllers: [SongsController],
    providers: [SongsService]
})
export class SongsModule {}
