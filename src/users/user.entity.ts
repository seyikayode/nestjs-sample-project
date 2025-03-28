import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Kayode",
    description: "Provide the first name of the user"
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: "Samson",
    description: "Provide the last name of the user"
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: "seyikay@gmailcom",
    description: "Provide the email of the user"
  })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  @ApiProperty({
    example: "efeYr72537@",
    description: "Provide the password of the user"
  })
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean

  @Column()
  apiKey: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}