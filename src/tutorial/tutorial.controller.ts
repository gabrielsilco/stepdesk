import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { TutorialService } from './tutorial.service';

@ApiTags('tutorial')
@Controller('tutorial')
export class TutorialController {
    constructor(private readonly tutorialService: TutorialService) {}

    @Post('/create')
    async create(@Body() newTutorialData: CreateTutorialDto) {
        return await this.tutorialService.create(newTutorialData);
    }
}
