import {Request, response, Response} from "express";
import {File} from "multer";
import {getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";
import {addBreedSchema} from "../joi/breed/addBreedSchema";

interface IMulterRequest extends Request {
    file: File;
}

class BreedController {
    async add(request: IMulterRequest, response: Response) {
        const {body, file} = request;
        const {name, description} = body;

        const breedRepository = getRepository(DogBreed);
        try {
            const result = await addBreedSchema.validateAsync({
                name,
                description,
                image: file.filename,
            });

            if (await breedRepository.findOne({name})) {
                return response.status(404).json({failed: "Breed is already exist !"});
            }

            const breedCreated = breedRepository.create(result);
            await breedRepository.save(breedCreated);
            return response.status(201).json({success: "Breed created !"});

        } catch (error) {
            const {details} = error;
            return response.status(500).json({details});
        }
    }

    async all(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);
        const breed = await breedRepository.find();
        return response.status(200).json({breed});
    }

    async one(request: Request, response: Response) {
        const {id} = request.params;
        const breedRepository = getRepository(DogBreed);
        const breed = await breedRepository.findOne(id);
        if (!breed) {
            return response.status(404).json({error: "Breed is not found"});
        }
        return response.status(200).json({breed});
    }

    async delete(request: Request, response: Response) {
        const {id} = request.params;
        const breedRepository = getRepository(DogBreed);
        const breed = await breedRepository.findOne(id);
        if (!breed) {
            return response.status(404).json({failed: "Breed is not found"});
        }
        await breedRepository.remove(breed);
        return response.status(200);
    }

    async breedRandomly(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);
        const breeds = await breedRepository.find();
        const random = Math.floor(Math.random() * breeds.length);
        return response.status(200).json(breeds[random]);
    }

    // WIP
    async topBreed(request: Request, response: Response) {
        const {topNumber} = request.params;
        console.log(topNumber);
        const breedRepository = getRepository(DogBreed);
        const test = await breedRepository.find({select: ["comment"]});
        console.log(test);
        const top = await breedRepository.createQueryBuilder("name").limit(10);
        console.log(typeof top);
        // return response.status(200).json({message: top});

    }
}

export default BreedController;
