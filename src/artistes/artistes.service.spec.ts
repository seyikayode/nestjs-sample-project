import { Test, TestingModule } from '@nestjs/testing';
import { ArtistesService } from './artistes.service';

describe('ArtistesService', () => {
  let service: ArtistesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistesService],
    }).compile();

    service = module.get<ArtistesService>(ArtistesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
