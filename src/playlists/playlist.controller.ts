import { Body, Controller, Post } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistService } from './playlist.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('playlists')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) {}

    @Post()
    create(
        @Body()
        playlistDTO: CreatePlaylistDto,
    ): Promise<Playlist> {
        return this.playlistService.create(playlistDTO);
    }
}