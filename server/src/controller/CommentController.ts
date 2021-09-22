import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Comment} from "../entity/Comment.entity";
import {addCommentSchema} from "../joi/comment/addCommentSchema";

class CommentController {

    async add(request: Request, response: Response) {
        const {pseudo, message} = request.body;
        const commentRepository = getRepository(Comment);
        try {
            const result = await addCommentSchema.validateAsync({pseudo, message});
            const commentCreated = commentRepository.create(result);
            await commentRepository.save(commentCreated);
            return response.status(201).json({message: "ok"});
        } catch (error) {
            return response.status(500).json({error});
        }
    }

    async one(request: Request, response: Response) {
        const {id} = request.params;
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(id);
        if (!comment) {
            return response.status(404).json({error: "comment is not found"});
        }
        return response.status(200).json({comment});
    }

    async delete(request: Request, response: Response) {
        const {id} = request.params;
        const commentRepository = getRepository(Comment);
        const comment = await commentRepository.findOne(id);
        if (!comment) {
            return response.status(404).json({failed: "comment is not found"});
        }
        await commentRepository.remove(comment);
        return response.status(200);
    }
}

export default CommentController;
