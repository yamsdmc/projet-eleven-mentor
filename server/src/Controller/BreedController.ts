import {Request} from "express";
import {getRepository} from "typeorm";
import {DogBreedEntity} from "../entity/DogBreed.entity";

export class BreedController {
    private breedRepository = getRepository(DogBreedEntity);

    async all() {
        return this.breedRepository.find();
    }

    async one(request: Request) {
        return this.breedRepository.findOne(request.params.id);
    }
}
