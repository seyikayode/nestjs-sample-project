import { Test, TestingModule } from '@nestjs/testing';
import { ArtistesController } from './artistes.controller';

describe('ArtistesController', () => {
  let controller: ArtistesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistesController],
    }).compile();

    controller = module.get<ArtistesController>(ArtistesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
