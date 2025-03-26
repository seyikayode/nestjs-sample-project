import { Module } from '@nestjs/common';
import { ArtistesService } from './artistes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artiste } from './artiste.entity';
import { ArtistesController } from './artistes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artiste])],
  providers: [ArtistesService],
  controllers: [ArtistesController],
  exports: [ArtistesService]
})
export class ArtistesModule {}
