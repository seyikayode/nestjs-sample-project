import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { Artiste } from './artistes/artiste.entity';
import { User } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';
import { PlaylistModule } from './playlists/playlist.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistesModule } from './artistes/artistes.module';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlaylistModule,
    AuthModule,
    UsersModule,
    ArtistesModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
constructor(private dataSource: DataSource) {
  console.log('dbName', dataSource.driver.database)
}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs')
  }
}
