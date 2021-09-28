import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Comment} from "../entity/Comment.entity";
import {DogBreed} from "../entity/DogBreed.entity";
import {addCommentSchema} from "../joi/comment/addCommentSchema";
import {commentsSchema} from "../joi/comment/commentsSchema";
import {idSchema} from "../joi/idSchema";

class CommentController {

    async add(request: Request, response: Response) {
        const data = request.body;
        const breedRepository = getRepository(DogBreed);
        const commentRepository = getRepository(Comment);

        try {
            const result = await addCommentSchema.validateAsync(data);
            const breed = await breedRepository.findOne({id: result.breedId});

            if (!breed) {
                return response.status(404).json({message: "breed is not exist"});
            }

            const commentCreated = commentRepository.create(data);
            await commentRepository.save(commentCreated);

            return response.status(201).json({message: "ok"});
        } catch (error) {
            return response.status(500).json({error});
        }
    }

    async one(request: Request, response: Response) {
        const {id} = request.params;
        const commentRepository = getRepository(Comment);

        try {
            await idSchema.validateAsync({id});
            const comment = await commentRepository.findOne(id);

            if (!comment) {
                return response.status(404).json({error: "comment is not found"});
            }

            return response.status(200).json({comment});
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async delete(request: Request, response: Response) {
        const {id} = request.params;
        const commentRepository = getRepository(Comment);
        try {
            await idSchema.validateAsync({id});
            const comment = await commentRepository.findOne(id);

            if (!comment) {
                return response.status(404).json({failed: "comment is not found"});
            }

            await commentRepository.remove(comment);

            return response.status(200);
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async comments(request: Request, response: Response) {
        const DEFAULT_COMMENTS_LIMIT = 25;
        const {limit = DEFAULT_COMMENTS_LIMIT} = request.query;

        const commentRepository = getRepository(Comment);

        try {
            await commentsSchema.validateAsync({limit});
            const comments = await commentRepository.find({
                relations: ["breed"],
                order: {createdAt: "DESC"},
                take: Number(limit),
            });

            return response.status(200).json({comments});
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async commentsByBreed(request: Request, response: Response) {
        const {id} = request.params;
        const commentRepository = getRepository(Comment);
        const breedRepository = getRepository(DogBreed);

        try {
            await idSchema.validateAsync({id});

            if (!await breedRepository.findOne(id)) {
                return response.status(404).json({message: "Breed is not exist"});
            }

            const comments = await commentRepository.createQueryBuilder("comment")
                .where(`comment.breedId=${id}`)
                .getMany();

            return response.status(200).json({comments});
        } catch (error) {
            return response.status(404).json({error});
        }
    }
}

export default CommentController;
