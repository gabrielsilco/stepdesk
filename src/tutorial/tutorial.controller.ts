import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStepDto } from './dto/step.dto';
import { CreateTutorialDto } from './dto/tutorial.dto';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialService } from './tutorial.service';

@ApiTags('tutorial')
@Controller('tutorial')
export class TutorialController {
    constructor(private readonly tutorialService: TutorialService) {}

    @Post('/create')
    async create(@Body() newTutorialData: CreateTutorialDto): Promise<Tutorial> {
        return await this.tutorialService.create(newTutorialData);
    }

    @Get('/all')
    async getAll(): Promise<Tutorial[]> {
        return await this.tutorialService.getAll();
    }

    @Get('/:tutorialId')
    async getById(@Param('tutorialId') tutorialId: string): Promise<Tutorial> {
        return await this.tutorialService.getById(tutorialId)
    }

    @Get('/search/:searchText')
    async searchByText(@Param('searchText') searchText: string): Promise<Tutorial[]> {
        return await this.tutorialService.searchByText(searchText);
    }

    //TODO: descobrir como tornar o subsequentStep opicional no Swagger
    // @Post('/addNewStep/:tutorialId')
    // async addNewStep(@Param('tutorialId') tutorialId: string, @Body() newStepData: CreateStepDto, @Query('subsequentStep') subsequentStep?: number) {
    //     return this.tutorialService.addStepToTutorial(tutorialId, newStepData, subsequentStep);
    // }

    @Post('/pushNewStep/:tutorialId')
    async pushStepToTutorial(@Param('tutorialId') tutorialId: string, @Body() newStepData: CreateStepDto): Promise<Tutorial> {
        return this.tutorialService.pushStepToTutorial(tutorialId, newStepData);
    }

    @Post('/insertNewStep/:tutorialId/:subsequentStep')
    async insertStepToTutorial(
        @Param('tutorialId') tutorialId: string,
        @Param('subsequentStep') subsequentStep: number,
        @Body() newStepData: CreateStepDto
        ): Promise<Tutorial> {
            return this.tutorialService.insertStepToTutorial(tutorialId, newStepData, subsequentStep);
        }

    @Post('/deleteStep/:tutorialId')
    async removeStep(@Param('tutorialId') tutorialId: string, @Body() stepToRemove: number) {
        return this.tutorialService.removeStepFromTutorial(tutorialId, stepToRemove)
    }
}
