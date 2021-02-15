import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialRepository } from './tutorial.repository';

@Injectable()
export class TutorialService {
    constructor(
        @InjectRepository(Tutorial)
        private tutorialRepository: TutorialRepository
    ) {}

    async create(newTutorialData: CreateTutorialDto): Promise<Tutorial> {
        return this.tutorialRepository.createTutorial(newTutorialData)
    }
}
