import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Playlist, Song, User])
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule {}
