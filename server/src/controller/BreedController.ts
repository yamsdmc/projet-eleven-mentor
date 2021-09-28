import {Request, response, Response} from "express";
import {File} from "multer";
import {getRepository} from "typeorm";
import {DogBreed} from "../entity/DogBreed.entity";
import {addBreedSchema} from "../joi/breed/addBreedSchema";
import {addLikeSchema} from "../joi/breed/addLikeSchema";
import {topBreedSchema} from "../joi/breed/topBreedSchema";
import {breedIdSchema} from "../joi/breed/breedIdSchema";

interface IMulterRequest extends Request {
    file: File;
}

const DEFAULT_TOP_LIMIT = 10;

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
        const breed = await breedRepository.find({relations: ["comments"]});
        return response.status(200).json({breed});
    }

    async one(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);
        try {
            const { breedId } = await breedIdSchema.validateAsync(request.params);

            const breed = await breedRepository.findOne(breedId, {relations: ["comments"]});
            if (!breed) {
                return response.status(404).json({error: "Breed is not found"});
            }

            return response.status(200).json({ breed });
        } catch (error) {
            return response.status(404).json({ error });
        }
    }

    async delete(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);

        try {
            const { breedId } = await breedIdSchema.validateAsync(request.params);

            const breed = await breedRepository.findOne(breedId);
            if (!breed) {
                return response.status(404).json({failed: "Breed is not found"});
            }

            await breedRepository.remove(breed);

            return response.status(200).json({success: "breed deleted"});
        } catch (error) {
            return response.status(404).json({error});
        }

    }

    async breedRandomly(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);

        const breed = await breedRepository.createQueryBuilder("dogbreed").orderBy("RANDOM()").getOne();

        return response.status(200).json(breed);
    }

    async topBreed(request: Request, response: Response) {
        try {
            const {limit = DEFAULT_TOP_LIMIT} = await topBreedSchema.validateAsync(request.query);

            const topBreeds = await getRepository(DogBreed)
                .createQueryBuilder("dogbreed")
                .leftJoin("dogbreed.comments", "comments")
                .addSelect("COUNT(comments.id) as commentsCount")
                .groupBy("dogbreed.id")
                .limit(limit)
                .orderBy("commentsCount", "DESC")
                .getMany();

            return response.status(200).json(topBreeds);
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async addLike(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);

        try {
            const { breedId } = await addLikeSchema.validateAsync(request.body);

            const breed = await breedRepository.findOne(breedId);
            if (!breed) {
                return response.status(404).json({failed: "breed does not exist"});
            }

            await breedRepository.save({id: breedId, likes: breed.likes + 1});

            return response.status(201).json({message: "like added"});
        } catch (error) {
            return response.status(500).json({error});
        }
    }
}

export default BreedController;
