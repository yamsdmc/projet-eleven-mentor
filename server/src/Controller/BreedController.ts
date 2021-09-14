import {Request} from "express";
import {getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";

class BreedController {
    private breedRepository = getRepository(DogBreed);

    async all() {
        return this.breedRepository.find();
    }

    async one(request: Request) {
        return this.breedRepository.findOne(request.params.id);
    }

    async add(request: Request) {
        const {params} = request;
        const breed = this.breedRepository.create({
            image: params.image,
            name: params.name,
            description: params.description,
        });
        return this.breedRepository.save(breed);
    }

    async delete(request: Request) {
        const breed = await this.breedRepository.findOne(request.params.id);
        if (!breed) {
            return {message: "Breed is not found"};
        }
        return this.breedRepository.remove(breed);
    }
}

export default BreedController;
