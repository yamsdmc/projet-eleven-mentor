import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";

class BreedController {

    async add(request: Request, response: Response) {
        const {body} = request;
        const breedRepository = getRepository(DogBreed);
        const breed = breedRepository.create({
            name: body.name,
            description: body.description,
            image: body.image,
        });
        return breedRepository.save(breed);
    }

    async all() {
        const breedRepository = getRepository(DogBreed);
        return breedRepository.find();
    }

    async one(request: Request) {
        const breedRepository = getRepository(DogBreed);
        return breedRepository.findOne(request.params.id);
    }

    async delete(request: Request) {
        const breedRepository = getRepository(DogBreed);
        const breed = await breedRepository.findOne(request.params.id);
        if (!breed) {
            return {message: "Breed is not found"};
        }
        return breedRepository.remove(breed);
    }
}

export default BreedController;
