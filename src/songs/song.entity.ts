import { Artiste } from 'src/artistes/artiste.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artiste, (artiste) => artiste.songs, { cascade: true })
  @JoinTable({ name: 'songs_artistes' })
  artistes: Artiste[];

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}