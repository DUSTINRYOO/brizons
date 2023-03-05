import { Test, TestingModule } from '@nestjs/testing';
import { BrizsService } from './brizs.service';

describe('BrizsService', () => {
  let service: BrizsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrizsService],
    }).compile();

    service = module.get<BrizsService>(BrizsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
