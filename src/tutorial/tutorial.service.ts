import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStepDto } from './dto/step.dto';
import { CreateTutorialDto } from './dto/tutorial.dto';
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

    async getAll(): Promise<Tutorial[]> {
        return this.tutorialRepository.getAllTutorials();
    }

    async getById(tutorialId: string): Promise<Tutorial> {
        return this.tutorialRepository.getTutorialById(tutorialId);
    }

    async searchByText(searchText: string): Promise<Tutorial[]> {
        return this.tutorialRepository.searchTutorials(searchText);
    }

    // async addStepToTutorial(tutorialId: string, newStep: CreateStepDto, subsequentStep?: number) {
    //     return this.tutorialRepository.addStepToTutorial(tutorialId, newStep, subsequentStep)
    // }

    async pushStepToTutorial(tutorialId: string, newStep: CreateStepDto): Promise<Tutorial> {
        return this.tutorialRepository.pushStepToTutorial(tutorialId, newStep);
    }

    async insertStepToTutorial(tutorialId: string, newStep: CreateStepDto, subsequentStep: number): Promise<Tutorial> {
        return this.tutorialRepository.insertStepToTutorial(tutorialId, newStep, subsequentStep);
    }

    async removeStepFromTutorial(tutorialId: string, stepToRemove: number) {
        return this.removeStepFromTutorial(tutorialId, stepToRemove)
    }
}
