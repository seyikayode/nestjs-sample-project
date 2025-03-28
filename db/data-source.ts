import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artiste } from "src/artistes/artiste.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            database: configService.get<string>('dbName'),
            host: configService.get<string>('dbHost'),
            port: configService.get<number>('dbPort'),
            username: configService.get<string>('dbUser'),
            password: configService.get<string>('dbPass'),
            entities: [User, Playlist, Artiste, Song],
            synchronize: false,
            migrations: ['dist/db/migrations/*.js']
        }
    }
}

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;