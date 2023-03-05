import { Test, TestingModule } from '@nestjs/testing';
import { BrizsResolver } from './brizs.resolver';
import { BrizsService } from './brizs.service';

describe('BrizsResolver', () => {
  let resolver: BrizsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrizsResolver, BrizsService],
    }).compile();

    resolver = module.get<BrizsResolver>(BrizsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
