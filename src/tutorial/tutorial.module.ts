import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TutorialController } from './tutorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialRepository } from './tutorial.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TutorialRepository])],
  providers: [TutorialService],
  controllers: [TutorialController]
})
export class TutorialModule {}
