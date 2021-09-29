import Joi from "joi";

export const commentIdSchema = Joi.object({
    commentId: Joi.number()
        .min(1)
        .required()
        .messages({"string.base": `"id" should be a type of 'number'`}),
});
