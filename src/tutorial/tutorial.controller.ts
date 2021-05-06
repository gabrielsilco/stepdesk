import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStepDto } from './dto/step.dto';
import { CreateTutorialDto } from './dto/tutorial.dto';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialService } from './tutorial.service';

@ApiTags('tutorial')
@Controller('tutorial')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()

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

    @Delete('/deleteStep/:tutorialId/:stepToRemove')
    async removeStep(@Param('tutorialId') tutorialId: string, @Param('stepToRemove') stepToRemove: number) {
        return this.tutorialService.removeStepFromTutorial(tutorialId, stepToRemove)
    }
}
