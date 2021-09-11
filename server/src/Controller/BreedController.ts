import {Request, Response} from "express";
import {EntityManager, getManager, getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";

export class BreedController {
    private breedRepository = getRepository(DogBreed);
    private manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    async all() {
        return this.breedRepository.find();
    }

    async one(request: Request) {
        return this.breedRepository.findOne(request.params.id);
    }

    async add(request: Request, response: Response) {
        const breed = new DogBreed();
        breed.image = request.params.image;
        breed.name = request.params.name;
        breed.description = request.params.description;
        return await this.manager.save(breed);
    }

    async delete(request: Request) {
        const breed = this.breedRepository.findOne(request.params.id);
        if (!breed) {
            return {message: "Breed is not found"};
        }
        return await this.manager.remove(breed);
    }
}
