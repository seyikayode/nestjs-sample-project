import { 
    Body, 
    Controller, 
    DefaultValuePipe, 
    Delete, 
    Get, 
    HttpException, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put, 
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtisteGuard } from 'src/auth/artistes-jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
    constructor (private songsService: SongsService) {}

    @Post()
    @UseGuards(JwtArtisteGuard)
    create(
        @Body() createSongDTO: CreateSongDTO,
        @Request() request
    ): Promise<Song> {
        console.log(request.user);
        return this.songsService.create(createSongDTO);
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit
        return this.songsService.paginate({
            page,
            limit
        })
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Song> {
        try {
            return this.songsService.findOne(id);

        } catch (err) {
            let errorMessage = (err as Error).message
            throw new HttpException(
                errorMessage,
                HttpStatus.NOT_FOUND,
                { cause: err }
            )
        }
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSongDTO: UpdateSongDTO
    ): Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDTO);
    }

    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<DeleteResult> {
        return this.songsService.remove(id);
    }
}
