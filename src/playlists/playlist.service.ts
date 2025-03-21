import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,
    
        @InjectRepository(Song)
        private songsRepo: Repository<Song>,
    
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async create(playlistDTO: CreatePlaylistDto): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = playlistDTO.name;
    
        // songs will be the array of ids that we are getting from the DTO object
        const songs = await this.songsRepo.findBy({ id: In(playlistDTO.songs) });
        playlist.songs = songs;
    
        // A user will be the id of the user we are getting from the request
        // when we implement the user authentication this id will become the loggedIn user id
        const user = await this.userRepo.findOneBy({ id: playlistDTO.user });
        if (!user) {
            throw new Error('User not found');
        }
        playlist.user = user;
    
        return this.playlistRepo.save(playlist);
    }
}