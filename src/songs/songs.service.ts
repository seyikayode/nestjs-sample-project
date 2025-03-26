import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artiste } from 'src/artistes/artiste.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artiste)
        private artisteRepository: Repository<Artiste>
    ) {}

    async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;

        const artistes = await this.artisteRepository.findBy({ id: In(songDTO.artistes) });
        song.artistes = artistes;

        return await this.songRepository.save(song);
    }

    async findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }

    async findOne(id: number): Promise<Song> {
        const song = await this.songRepository.findOneBy({ id });
        if (!song) {
            throw new NotFoundException(`Song with id ${id} not found`);
        }
        return song;
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.songRepository.delete(id);
    }

    async update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
        return await this.songRepository.update(id, {
            title: recordToUpdate.title,
            artistes: recordToUpdate.artistes,
            releasedDate: recordToUpdate.releasedDate,
            duration: recordToUpdate.duration,
            lyrics: recordToUpdate.lyrics
        });
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');

        return await paginate<Song>(queryBuilder, options)
    }
}
