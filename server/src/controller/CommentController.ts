import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Comment} from "../entity/Comment.entity";
import {DogBreed} from "../entity/DogBreed.entity";
import {breedIdSchema} from "../joi/breed/breedIdSchema";
import {addCommentSchema} from "../joi/comment/addCommentSchema";
import {commentIdSchema} from "../joi/comment/commentIdSchema";
import {commentsSchema} from "../joi/comment/commentsSchema";

const DEFAULT_COMMENTS_LIMIT = 25;

class CommentController {

    async add(request: Request, response: Response) {
        const breedRepository = getRepository(DogBreed);
        const commentRepository = getRepository(Comment);

        try {
            const schemaValidate = await addCommentSchema.validateAsync(request.body);
            const breed = await breedRepository.findOne({id: schemaValidate.breedId});

            if (!breed) {
                return response.status(404).json({message: "breed is not exist"});
            }

            const commentCreated = commentRepository.create(schemaValidate);
            await commentRepository.save(commentCreated);

            return response.status(201).json({message: "ok"});
        } catch (error) {
            return response.status(500).json({error});
        }
    }

    async one(request: Request, response: Response) {
        const commentRepository = getRepository(Comment);

        try {
            const {commentId} = await commentIdSchema.validateAsync(request.params);
            const comment = await commentRepository.findOne(commentId);

            if (!comment) {
                return response.status(404).json({error: "comment is not found"});
            }

            return response.status(200).json({comment});
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async delete(request: Request, response: Response) {
        const commentRepository = getRepository(Comment);
        try {
            const {commentId} = await commentIdSchema.validateAsync(request.params);
            const comment = await commentRepository.findOne(commentId);

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
        const commentRepository = getRepository(Comment);

        try {
            const {limit = DEFAULT_COMMENTS_LIMIT} = await commentsSchema.validateAsync(request.query);
            const comments = await commentRepository.find({
                relations: ["breed"],
                order: {createdAt: "DESC"},
                take: limit,
            });

            return response.status(200).json({comments});
        } catch (error) {
            return response.status(404).json({error});
        }
    }

    async commentsByBreed(request: Request, response: Response) {
        const commentRepository = getRepository(Comment);
        const breedRepository = getRepository(DogBreed);

        try {
            const {breedId} = await breedIdSchema.validateAsync(request.params);
            if (!await breedRepository.findOne(breedId)) {
                return response.status(404).json({message: "Breed is not exist"});
            }

            const comments = await commentRepository.createQueryBuilder("comment")
                .leftJoin("comment.breed", "breed")
                .where("breed.id = :breedId", { breedId })
                .getMany();

            return response.status(200).json({comments});
        } catch (error) {
            return response.status(404).json({error});
        }
    }
}

export default CommentController;
