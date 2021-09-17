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
        breedRepository.save(breed).then(() => response.status(201).json({ message: "Breed created !"}))
            .catch((error) => response.status(400).json({ error }));
    }

    async all(request: Request, response: Response) {
        const breedRepository = await getRepository(DogBreed);
        const breed = await breedRepository.find();
        return response.json( {breed});
    }

    async one(request: Request, response: Response) {
        const breed = await getRepository(DogBreed).findOne(request.params.id);
        if (!breed) {
            return response.json({error: "Breed is not found"});
        }
        return response.json({breed});
    }

    async delete(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);
        const breed = await breedRepository.findOne(request.params.id);
        if (!breed) {
            return response.json({failed: "Breed is not found"});
        }
        await breedRepository.remove(breed);
        return response.json({success: "Breed delete !"});
    }
}

export default BreedController;
