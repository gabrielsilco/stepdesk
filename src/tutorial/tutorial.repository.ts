import { EntityRepository, getMongoManager, Repository } from "typeorm";
import { CreateTutorialDto } from "./dto/create-tutorial.dto";
import { Tutorial } from "./entities/tutorial.entity";

@EntityRepository(Tutorial)
export class TutorialRepository extends Repository<Tutorial> {

    async createTutorial(newTutorialData: CreateTutorialDto): Promise<Tutorial> {
        const manager = getMongoManager();
        const newTutorial = new Tutorial();
        const { title, type, defaultSteps } = newTutorialData;
        newTutorial.title = title;
        newTutorial.type = type;
        newTutorial.defaultSteps = defaultSteps;

        await manager.save(newTutorial)
        
        return newTutorial
    }
}