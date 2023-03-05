import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrizsService } from './brizs.service';
import { Briz } from './entities/briz.entity';
import { CreateBrizInput } from './dto/create-briz.input';
import { UpdateBrizInput } from './dto/update-briz.input';

@Resolver(() => Briz)
export class BrizsResolver {
  constructor(private readonly brizsService: BrizsService) {}

  @Mutation(() => Briz)
  createBriz(@Args('createBrizInput') createBrizInput: CreateBrizInput) {
    return this.brizsService.create(createBrizInput);
  }

  @Query(() => [Briz], { name: 'brizs' })
  findAll() {
    return this.brizsService.findAll();
  }

  @Query(() => Briz, { name: 'briz' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.brizsService.findOne(id);
  }

  @Mutation(() => Briz)
  updateBriz(@Args('updateBrizInput') updateBrizInput: UpdateBrizInput) {
    return this.brizsService.update(updateBrizInput.id, updateBrizInput);
  }

  @Mutation(() => Briz)
  removeBriz(@Args('id', { type: () => Int }) id: number) {
    return this.brizsService.remove(id);
  }
}
