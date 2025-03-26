import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artiste } from './artiste.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistesService {
    constructor(
        @InjectRepository(Artiste)
        private artisteRepo: Repository<Artiste>
    ) {}

    async findArtiste(userId: number): Promise<Artiste> {
        const artiste = await this.artisteRepo.findOneBy({ user: { id: userId } });
        if (!artiste) {
            throw new UnauthorizedException('Could not find artiste')
        }
        return artiste;
    }
}
