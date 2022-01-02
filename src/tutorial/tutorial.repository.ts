import { EntityRepository, getMongoManager, getMongoRepository, Repository } from "typeorm";
import { CreateStepDto } from "./dto/step.dto";
import { CreateTutorialDto } from "./dto/tutorial.dto";
import { Tutorial } from "./entities/tutorial.entity";

@EntityRepository(Tutorial)
export class TutorialRepository extends Repository<Tutorial> {

    async createTutorial(newTutorialData: CreateTutorialDto): Promise<Tutorial> {
        const manager = getMongoManager();
        const newTutorial = new Tutorial();
        const { title, warning, warningExpiration, summary, keyWords, type, defaultSteps } = newTutorialData;
        newTutorial.title = title;
        newTutorial.warning = warning;
        newTutorial.summary = summary;
        newTutorial.warningExpiration = warningExpiration;
        newTutorial.tutorialType = type;
        newTutorial.defaultSteps = defaultSteps;
        newTutorial.keyWords = keyWords;

        await manager.save(newTutorial)
        
        return newTutorial
    }

    async getAllTutorials(): Promise<Tutorial[]> {
        const manager = getMongoManager();
        return await manager.find(Tutorial);
    }

    async getTutorialById(tutorialId: string): Promise<Tutorial> {
        const manager = getMongoRepository(Tutorial);
        return await manager.findOne(tutorialId)
    }

    // TODO: configurar a busca para encontrar valores dentro da string
    async searchTutorials(searchText: string): Promise<Tutorial[]> {
        const manager = getMongoRepository(Tutorial);
        return await manager.find({
            where: {
                $or: [
                    { title: searchText },
                    { keyWords: searchText}
                ]
            }
        })
    }

    // async addStepToTutorial(tutorialId: string, newStep: CreateStepDto, subsequentStep?: number) {
    //     const manager = getMongoRepository(Tutorial);
    //     let tutorialToUpdate = await manager.findOne(tutorialId);
    //     const subsequentIndex = subsequentStep - 1;

    //     if (subsequentStep) {
    //         if (subsequentStep > tutorialToUpdate.defaultSteps.length) {
    //             tutorialToUpdate.defaultSteps.push(newStep);
    //         } else {
    //             tutorialToUpdate.defaultSteps.splice(subsequentStep, 0, newStep)
    //         }
    //     } else {
    //         tutorialToUpdate.defaultSteps.push(newStep);
    //     }

    //     await manager.update(tutorialId, tutorialToUpdate)
    //     return tutorialToUpdate;
    // }

    async pushStepToTutorial(tutorialId: string, newStep: CreateStepDto): Promise<Tutorial> {
        const manager = getMongoRepository(Tutorial);
        let tutorialToUpdate = await manager.findOne(tutorialId);
        tutorialToUpdate.defaultSteps.push(newStep);

        await manager.update(tutorialId, tutorialToUpdate);
        return tutorialToUpdate;
    }

    async insertStepToTutorial(tutorialId: string, newStep: CreateStepDto, subsequentStep: number): Promise<Tutorial> {
        const manager = getMongoRepository(Tutorial);
        let tutorialToUpdate = await manager.findOne(tutorialId);
        const subsequentIndex = subsequentStep - 1;

        if (subsequentStep > tutorialToUpdate.defaultSteps.length) {
            tutorialToUpdate.defaultSteps.push(newStep);
        } else {
            tutorialToUpdate.defaultSteps.splice(subsequentIndex, 0, newStep);
        }

        await manager.update(tutorialId, tutorialToUpdate);
        return tutorialToUpdate;
    }

    async removeStepFromTutorial(tutorialId: string, stepToRemove: number) {
        const manager = getMongoRepository(Tutorial);
        let tutorialToUpdate = await manager.findOne(tutorialId);
        const stepIndex = stepToRemove - 1

        if (stepIndex > tutorialToUpdate.defaultSteps.length) {
            console.log('error')
        }

        tutorialToUpdate.defaultSteps.splice(stepIndex, 1);
        await manager.update(tutorialId, tutorialToUpdate)
        return tutorialToUpdate;
    }
}