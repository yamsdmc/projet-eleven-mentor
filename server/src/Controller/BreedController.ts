import {Request} from "express";
import {getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";

class BreedController {
    async all() {
        const breedRepository = getRepository(DogBreed);
        return breedRepository.find();
    }

    async one(request: Request) {
        const breedRepository = getRepository(DogBreed);
        return breedRepository.findOne(request.params.id);
    }

    async add(request: Request) {
        const {params} = request;
        const breedRepository = getRepository(DogBreed);
        const breed = breedRepository.create({
            image: params.image,
            name: params.name,
            description: params.description,
        });
        console.log(breed.image, "image");
        console.log(breed.name, "name");
        console.log(breed.description, "description");
        return breedRepository.save(breed);
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
